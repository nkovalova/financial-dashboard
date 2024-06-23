import { Injectable } from '@nestjs/common';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';

@Injectable()
export class RecommendationsService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORGANIZATION,
    });
    console.log(process.env.OPENAI_API_KEY);
  }

  async generateRecommendations(data: any): Promise<string> {
    const prompt = `Here are the financial data: ${JSON.stringify(data)}. Provide insights, comparisons with benchmarks, and recommendations.`;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          content: prompt,
          role: 'user',
        },
      ],
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  }
}
