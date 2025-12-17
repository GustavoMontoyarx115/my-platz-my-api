import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../env.models';

@Injectable()
export class OpenaiService {
  private openai: OpenAI | null = null;

  constructor(private readonly configService: ConfigService<Env>) {
    const apiKey = this.configService.get('OPEN_API_KEY', { infer: true });

    // 🔒 NO rompemos la app si la variable no existe
    if (!apiKey) {
      console.warn('⚠️ OPEN_API_KEY not set. OpenAI service is disabled.');
      return;
    }

    this.openai = new OpenAI({ apiKey });
  }

  // =========================
  // Generate summary
  // =========================
  async generateSummary(content: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI service is disabled');
    }

    const response = await this.openai.responses.create({
      model: 'gpt-3.5-turbo',
      instructions:
        'Generate a concise summary of the following content. The summary must be no longer than 200 characters.',
      input: content,
    });

    return response.output_text;
  }

  // =========================
  // Generate image
  // =========================
  async generateImage(text: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI service is disabled');
    }

    const prompt = `Create an image that represents the following text: ${text}`;

    const response = await this.openai.images.generate({
      model: 'dall-e-3',
      prompt,
    });

    if (!response.data?.[0]?.url) {
      throw new Error('Failed to generate image');
    }

    return response.data[0].url;
  }
}
