import "dotenv/config";
import Redis from "ioredis";

class RedisSingleton {
  private static client: Redis | null = null;

  private constructor() {} // Prevent instantiation

  static async getInstance(): Promise<Redis> {
    if (!RedisSingleton.client) {
      RedisSingleton.client = new Redis({
        host: process.env.REDIS_HOST,
        port: 15739,
        password: process.env.REDIS_PASSWORD, // optional
        db: 0,
        username: process.env.REDIS_USERNAME   // optional DB index
        // tls: {},               // if using Redis over SSL
      });
      console.log(`Redis connected`)
    }
    return RedisSingleton.client;
  }
}

export default RedisSingleton;
