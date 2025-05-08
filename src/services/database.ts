import { BlogPost } from '../types'

class Database {
  private posts: Map<string, BlogPost>

  constructor() {
    this.posts = new Map()
  }

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    const newPost: BlogPost = {
      ...post,
      id: `post-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.posts.set(newPost.id, newPost)
    return newPost
  }

  async getPost(id: string): Promise<BlogPost | null> {
    return this.posts.get(id) || null
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return Array.from(this.posts.values())
  }

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const post = this.posts.get(id)
    if (!post) return null

    const updatedPost: BlogPost = {
      ...post,
      ...updates,
      updatedAt: new Date(),
    }
    this.posts.set(id, updatedPost)
    return updatedPost
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id)
  }
}

// 싱글톤 인스턴스 생성
export const database = new Database() 