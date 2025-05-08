import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIConfig, BlogPost } from '../types';

export class AIService {
  private config: AIConfig;
  private genAI: GoogleGenerativeAI;

  constructor(config: AIConfig) {
    this.config = config;
    this.genAI = new GoogleGenerativeAI(config.apiKey);
  }

  async generateBlogPost(keyword: string): Promise<BlogPost> {
    try {
      const model = this.genAI.getGenerativeModel({ model: this.config.model });

      // Generate SEO-optimized title
      const titlePrompt = `Create an SEO-optimized blog title for the keyword: "${keyword}". 
        The title should be engaging and include the keyword naturally.`;
      
      const titleResult = await model.generateContent(titlePrompt);
      const title = titleResult.response.text();

      // Generate blog content
      const contentPrompt = `Write a comprehensive blog post about "${keyword}". 
        Include:
        1. An engaging introduction
        2. Main sections with detailed information
        3. Practical tips or examples
        4. A conclusion with a call to action
        Make it SEO-friendly and natural to read.`;

      const contentResult = await model.generateContent(contentPrompt);
      const content = contentResult.response.text();

      return {
        id: `post-${Date.now()}`,
        title,
        content,
        keyword,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error generating blog post:', error);
      throw error;
    }
  }
} 