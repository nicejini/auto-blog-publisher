import { NextResponse } from 'next/server'
import { database } from '@/services/database'
import { AIService } from '@/services/aiService'
import { GoogleSheetsService } from '@/services/googleSheets'

const aiService = new AIService({
  apiKey: process.env.GOOGLE_AI_API_KEY!,
  model: 'gemini-pro',
  maxTokens: 2000,
  temperature: 0.7,
})

const sheetsService = new GoogleSheetsService({
  apiKey: process.env.GOOGLE_SHEETS_API_KEY!,
  sheetId: process.env.GOOGLE_SHEETS_ID!,
  range: 'Sheet1!A:A',
})

export async function GET() {
  try {
    const posts = await database.getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    // Get keywords from Google Sheets
    const keywords = await sheetsService.getKeywords()
    const keyword = keywords[0] // Get the first pending keyword

    if (!keyword) {
      return NextResponse.json(
        { error: 'No keywords available' },
        { status: 404 }
      )
    }

    // Generate blog post using AI
    const post = await aiService.generateBlogPost(keyword.keyword)

    // Save to database
    const savedPost = await database.createPost(post)

    // Update keyword status
    await sheetsService.updateKeywordStatus(keyword.id, 'completed')

    return NextResponse.json(savedPost)
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 