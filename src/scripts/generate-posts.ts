import { GoogleSheetsService } from '../services/googleSheets';
import { AIService } from '../services/aiService';
import { BlogPublisher } from '../services/blogPublisher';
import { GoogleSheetsConfig, AIConfig, BlogConfig } from '../types';

async function main() {
  // Initialize services with configuration
  const sheetsConfig: GoogleSheetsConfig = {
    apiKey: process.env.GOOGLE_SHEETS_API_KEY!,
    sheetId: process.env.GOOGLE_SHEETS_ID!,
    range: 'Sheet1!A:A', // Adjust based on your sheet structure
  };

  const aiConfig: AIConfig = {
    apiKey: process.env.GOOGLE_AI_API_KEY!,
    model: 'gemini-pro',
    maxTokens: 2000,
    temperature: 0.7,
  };

  const blogConfig: BlogConfig = {
    apiEndpoint: process.env.BLOG_API_ENDPOINT!,
    apiKey: process.env.BLOG_API_KEY!,
    dailyLimit: 50,
  };

  const sheetsService = new GoogleSheetsService(sheetsConfig);
  const aiService = new AIService(aiConfig);
  const blogPublisher = new BlogPublisher(blogConfig);

  try {
    // Get keywords from Google Sheets
    const keywords = await sheetsService.getKeywords();
    console.log(`Found ${keywords.length} keywords to process`);

    // Process keywords up to daily limit
    const keywordsToProcess = keywords.slice(0, blogConfig.dailyLimit);
    
    for (const keyword of keywordsToProcess) {
      try {
        // Generate blog post
        const post = await aiService.generateBlogPost(keyword.keyword);
        console.log(`Generated post for keyword: ${keyword.keyword}`);

        // Publish post
        const publishedPost = await blogPublisher.publishPost(post);
        console.log(`Published post: ${publishedPost.title}`);

        // Update keyword status
        await sheetsService.updateKeywordStatus(
          keyword.id,
          publishedPost.status === 'published' ? 'completed' : 'failed'
        );
      } catch (error) {
        console.error(`Error processing keyword ${keyword.keyword}:`, error);
        await sheetsService.updateKeywordStatus(keyword.id, 'failed');
      }
    }
  } catch (error) {
    console.error('Error in main process:', error);
    process.exit(1);
  }
}

main(); 