# Spanish Learning Website

A comprehensive Spanish learning platform with grammar, vocabulary, and interactive exercises.

## Features

- Verb conjugation tables and practice exercises
- Reading comprehension exercises with AI-generated feedback
- Flashcards and quizzes for vocabulary and grammar
- Short answer questions with AI review

## Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Environment Variables

This application requires the following environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key
- `DAILY_API_LIMIT`: Maximum number of OpenAI API calls per day (default: 20)

### Local Development

Create a `.env.local` file in the root directory with the following content:

```
OPENAI_API_KEY=your_openai_api_key_here
DAILY_API_LIMIT=20
```

### Vercel Deployment

When deploying to Vercel, set the environment variables in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add the required environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DAILY_API_LIMIT`: Maximum number of OpenAI API calls per day (optional, defaults to 20)

## API Usage Limits

To prevent excessive OpenAI API usage, the application implements a daily limit for API calls:

- By default, the application allows 20 API calls per day across all users
- The limit resets at midnight UTC
- When the limit is reached, API calls will return a 429 error with a message
- You can adjust the limit by changing the `DAILY_API_LIMIT` environment variable

## Content Management

The flashcards and quizzes for verb conjugation practice can be edited in:

- `public/content/conjugation/flashcards.json`
- `public/content/conjugation/quizzes.json`

Follow the existing format to add new categories, cards, or questions.

## Security Considerations

- The OpenAI API key is stored as an environment variable and never exposed to clients
- Usage tracking is done server-side to prevent manipulation
- API rate limiting helps prevent abuse and excessive costs

## License

This project is licensed under the MIT License - see the LICENSE file for details.
