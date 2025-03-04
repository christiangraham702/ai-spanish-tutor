import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Check if the API key is available
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not defined in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory counter for Vercel deployment
let apiCallsToday = 0;
let lastResetDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

// Function to read the usage counter - handles both file-based and in-memory approaches
async function readUsageCounter(): Promise<number> {
  const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
  
  // If the date changed, reset the in-memory counter
  if (today !== lastResetDate) {
    apiCallsToday = 0;
    lastResetDate = today;
  }

  try {
    // Try to use file-based counter (works in development)
    const counterPath = path.join(process.cwd(), 'api-usage-counter.json');
    
    // Create the counter file if it doesn't exist
    if (!fs.existsSync(counterPath)) {
      const initialData = { 
        date: today,
        count: 0 
      };
      fs.writeFileSync(counterPath, JSON.stringify(initialData), 'utf-8');
      return 0;
    }
    
    const data = JSON.parse(fs.readFileSync(counterPath, 'utf-8'));
    
    // Reset counter if it's a new day
    if (data.date !== today) {
      const resetData = { date: today, count: 0 };
      fs.writeFileSync(counterPath, JSON.stringify(resetData), 'utf-8');
      return 0;
    }
    
    return data.count;
  } catch (error) {
    // If file-based approach fails (e.g., on Vercel), use in-memory counter
    console.log('Using in-memory counter due to filesystem constraints');
    return apiCallsToday;
  }
}

// Function to increment the usage counter - handles both file-based and in-memory approaches
async function incrementUsageCounter(): Promise<void> {
  const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
  
  // Always increment the in-memory counter
  if (today !== lastResetDate) {
    apiCallsToday = 1;
    lastResetDate = today;
  } else {
    apiCallsToday += 1;
  }
  
  try {
    // Try to update file-based counter (works in development)
    const counterPath = path.join(process.cwd(), 'api-usage-counter.json');
    
    const data = JSON.parse(fs.readFileSync(counterPath, 'utf-8'));
    
    // If it's a new day, reset the counter
    if (data.date !== today) {
      const resetData = { date: today, count: 1 };
      fs.writeFileSync(counterPath, JSON.stringify(resetData), 'utf-8');
      return;
    }
    
    // Increment the counter
    data.count += 1;
    fs.writeFileSync(counterPath, JSON.stringify(data), 'utf-8');
  } catch (error) {
    // If file operations fail, we're already using the in-memory counter
    console.log('Using in-memory counter for increments due to filesystem constraints');
  }
}

async function readPromptFile(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'src', 'prompts', filename);
  return fs.readFileSync(filePath, 'utf-8');
}

export async function POST(req: Request) {
  try {
    // Check API usage limit
    const currentUsage = await readUsageCounter();
    const DAILY_LIMIT = Number(process.env.DAILY_API_LIMIT || '20');
    
    if (currentUsage >= DAILY_LIMIT) {
      return NextResponse.json(
        { error: 'Daily API usage limit reached. Please try again tomorrow.' },
        { status: 429 }
      );
    }
    
    const { action, text, question, answer } = await req.json();

    let prompt = '';
    if (action === 'generate') {
      prompt = await readPromptFile('generate-story.txt');
    } else if (action === 'review') {
      const basePrompt = await readPromptFile('review-text.txt');
      const parts = basePrompt.split('Practice Text for Analysis:');
      const beforeText = parts[0];
      const afterText = parts[1].split('Expected Output')[1];
      prompt = beforeText + 'Practice Text for Analysis:\n\n' + text + '\n\nExpected Output' + afterText;
    } else if (action === 'generate-questions') {
      const basePrompt = await readPromptFile('generate-questions.txt');
      prompt = basePrompt.replace('[TEXT WILL BE INSERTED HERE]', text);
    } else if (action === 'review-answer') {
      prompt = await readPromptFile('review-answer.txt');
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system' as const,
        content: prompt,
      },
    ];

    if (action === 'generate') {
      messages.push({
        role: 'user' as const,
        content: 'Generate a new practice text.',
      });
    } else if (action === 'review') {
      messages.push({
        role: 'user' as const,
        content: 'Review the text.',
      });
    } else if (action === 'generate-questions') {
      messages.push({
        role: 'user' as const,
        content: 'Generate questions for this text.',
      });
    } else if (action === 'review-answer') {
      messages.push({
        role: 'user' as const,
        content: JSON.stringify({
          question,
          answer,
          context: text,
        }),
      });
    }

    // Increment the usage counter before making the API call
    await incrementUsageCounter();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 