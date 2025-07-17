import mongoose, { Connection } from "mongoose";

export class MongoSingleton {
  private static connection: Connection | null = null;

  /** Hide the constructor to prevent `new MongoSingleton()` */
  private constructor() {}

  /** Get (or lazily create) the shared MongoDB connection */
  static async getConnection(): Promise<Connection> {
    if (MongoSingleton.connection && MongoSingleton.connection.readyState === 1) {
      return MongoSingleton.connection;
    }

    const dbHost = process.env.DB_HOST;
    if (!dbHost) throw new Error("DB_HOST is not defined in env vars");

    const conn = await mongoose.connect(dbHost);
    console.log(`✅ MongoDB connected at ${conn.connection.host}`);

    MongoSingleton.connection = conn.connection;
    return MongoSingleton.connection;
  }
}
