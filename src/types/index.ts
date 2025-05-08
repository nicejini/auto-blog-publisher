export interface Keyword {
  id: string;
  keyword: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  keyword: string;
  status: 'draft' | 'published' | 'failed';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GoogleSheetsConfig {
  apiKey: string;
  sheetId: string;
  range: string;
}

export interface AIConfig {
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

export interface BlogConfig {
  apiEndpoint: string;
  apiKey: string;
  dailyLimit: number;
} 