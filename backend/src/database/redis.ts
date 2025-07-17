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

  public static async setKey(key: string, value: any){
    if(!RedisSingleton.client){
      RedisSingleton.client = await RedisSingleton.getInstance();
    }

    await RedisSingleton.client.set(key, value, 'EX', 3600);
  }

  public static async getKey(key: string){
    if(!RedisSingleton.client){
      RedisSingleton.client = await RedisSingleton.getInstance();
    }

    return await RedisSingleton.client.get(key);
  }
}

export default RedisSingleton;
