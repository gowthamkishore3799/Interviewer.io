import "dotenv/config";
import fs from "fs";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { ResponseInput } from "openai/resources/responses/responses";
import path from "path";
import { outputFormatMap } from "../constants/responseFormat";

export class LLM {
  private static client: OpenAI;

  private constructor() {}

  public static init(): void {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is required");
    }

    if (!LLM.client) {
      LLM.client = new OpenAI({ apiKey });
      console.log("OpenAI client initialized");
    }
  }

  public static getClient(): OpenAI {
    if (!LLM.client) {
      throw new Error("LLM not initialized. Call LLM.init() first.");
    }
    return LLM.client;
  }

  public static async generateResponse(
    systemMessages: ResponseInput,
    format: keyof typeof outputFormatMap
  ): Promise<any> {
    if (!LLM.client) LLM.init();

    const outputFormat = outputFormatMap[format];
    const response = await LLM.client.responses.parse({
      model: "gpt-4o-2024-08-06",
      input: systemMessages,
      temperature: 0.8,
      text: {
        format: zodTextFormat(outputFormat, format),
      },
    });

    return response.output_parsed || {};
  }

  public static async sendToWhisper(audioBase64: string): Promise<string> {
    if (!LLM.client) LLM.init();

    try {
      const base64Data = audioBase64.replace(/^data:audio\/wav;base64,/, "");
      const audioBuffer = Buffer.from(base64Data, "base64");

      const tempDir = path.join(__dirname, "temp");
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const tempPath = path.join(tempDir, `audio_${Date.now()}.wav`);
      fs.writeFileSync(tempPath, audioBuffer);

      try {
        const transcription = await LLM.client.audio.transcriptions.create({
          file: fs.createReadStream(tempPath),
          model: "whisper-1",
        });

        console.log(transcription)
        return transcription.text;
      } finally {
        fs.unlinkSync(tempPath);
      }
    } catch (error) {
      throw error;
    }
  }
}
