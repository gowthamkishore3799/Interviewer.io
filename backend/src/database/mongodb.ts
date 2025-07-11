import mongoose, { Connection } from 'mongoose';

export class Mongodb {
  static #instance: Mongodb;
  private connection!: Connection;

  private constructor() {}

  private static async mongodbConnect(): Promise<Connection> {
    try {
      const dbHost = process.env.DB_HOST as string;
      if (!dbHost) {
        throw new Error('DB_HOST is not defined in environment variables.');
      }

      const conn = await mongoose.connect(dbHost);
      console.log(`✅ MongoDB connected at ${conn.connection.host}`);
      return conn.connection;
    } catch (e) {
      console.error('❌ Error in creating MongoDB connection:', e);
      throw e;
    }
  }

  public static async getInstance(): Promise<void> {
    if (!Mongodb.#instance) {
      Mongodb.#instance = new Mongodb();
    }

    if (
      Mongodb.#instance.connection &&
      Mongodb.#instance.connection.readyState === 1
    ) {
      return;
    }

    Mongodb.#instance.connection = await Mongodb.mongodbConnect();
  }
}
