import { google } from 'googleapis';
import { GoogleSheetsConfig, Keyword } from '../types';

export class GoogleSheetsService {
  private config: GoogleSheetsConfig;
  private sheets;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
    this.sheets = google.sheets({ version: 'v4', auth: this.config.apiKey });
  }

  async getKeywords(): Promise<Keyword[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.sheetId,
        range: this.config.range,
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        return [];
      }

      return rows.map((row, index) => ({
        id: `keyword-${index}`,
        keyword: row[0], // Assuming '황금키워드' is in the first column
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    } catch (error) {
      console.error('Error fetching keywords from Google Sheets:', error);
      throw error;
    }
  }

  async updateKeywordStatus(keywordId: string, status: Keyword['status']): Promise<void> {
    // Implementation for updating keyword status in the sheet
    // This would require additional sheet configuration for status tracking
  }
} 