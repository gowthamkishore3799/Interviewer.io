import { Redis } from "ioredis";
import { ResponseInput } from "openai/resources/responses/responses";
import RedisSingleton from "../database/redis"; // Adjust path as needed

export class Interview {
  private static model: Redis;

  public static async init(): Promise<void> {
    if (this.model) return;
    this.model = await RedisSingleton.getInstance();
  }

  public static async createInterview(
    userId: string,
    interviewId: string,
    conversation: any
  ): Promise<void> {
    if (!this.model) {
      await this.init();
    }

    const key = `${userId}-${interviewId}`;
    await this.model.set(key, JSON.stringify(conversation), "EX",3600000);
  }

  public static async getConversation(
    userId: string,
    interviewId: string
  ): Promise<ResponseInput> {
    try {
      if (!this.model) {
        await this.init();
      }
      const key = `${userId}-${interviewId}`;
      const response = await this.model.get(key);

      if (!response) {
        throw new Error("Error in fetching conv");
      }

      let conversation = JSON.parse(response);
      return conversation;
    } catch (e) {
      console.log(e, "Error in fetching conversation");
      return [];
    }
  }
}
