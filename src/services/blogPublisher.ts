import { BlogConfig, BlogPost } from '../types';

export class BlogPublisher {
  private config: BlogConfig;

  constructor(config: BlogConfig) {
    this.config = config;
  }

  async publishPost(post: BlogPost): Promise<BlogPost> {
    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          status: 'published',
          publishedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to publish post: ${response.statusText}`);
      }

      const publishedPost = await response.json();
      return {
        ...post,
        status: 'published',
        publishedAt: new Date(publishedPost.publishedAt),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error publishing blog post:', error);
      return {
        ...post,
        status: 'failed',
        updatedAt: new Date(),
      };
    }
  }
} 