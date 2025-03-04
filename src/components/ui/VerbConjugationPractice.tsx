'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Flashcard from './Flashcard';
import Quiz from './Quiz';

interface FlashcardContent {
  version: string;
  categories: {
    name: string;
    cards: {
      id: string;
      front: string;
      back: string;
      example: string;
    }[];
  }[];
}

interface QuizContent {
  version: string;
  categories: {
    name: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
    }[];
  }[];
}

const VerbConjugationPractice = () => {
  const [flashcardContent, setFlashcardContent] = useState<FlashcardContent | null>(null);
  const [quizContent, setQuizContent] = useState<QuizContent | null>(null);
  const [selectedFlashcardCategory, setSelectedFlashcardCategory] = useState(0);
  const [selectedQuizCategory, setSelectedQuizCategory] = useState(0);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [flashcardsResponse, quizzesResponse] = await Promise.all([
          fetch('/content/conjugation/flashcards.json'),
          fetch('/content/conjugation/quizzes.json')
        ]);

        const flashcardsData = await flashcardsResponse.json();
        const quizzesData = await quizzesResponse.json();

        setFlashcardContent(flashcardsData);
        setQuizContent(quizzesData);
      } catch (error) {
        console.error('Error loading practice content:', error);
      }
    };

    loadContent();
  }, []);

  if (!flashcardContent || !quizContent) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading practice content...</p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Practice Conjugations</h2>
        <p className="text-gray-600">
          Test your knowledge of Spanish verb conjugations with these flashcards and quizzes.
          Select a category to focus on specific tenses or patterns.
        </p>
      </div>

      <div className="space-y-8">
        {/* Flashcards Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Conjugation Flashcards</h3>
            <select
              value={selectedFlashcardCategory}
              onChange={(e) => setSelectedFlashcardCategory(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {flashcardContent.categories.map((category, index) => (
                <option key={category.name} value={index}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <Flashcard
            title={flashcardContent.categories[selectedFlashcardCategory].name}
            cards={flashcardContent.categories[selectedFlashcardCategory].cards.map((card) => ({
              id: Number(card.id.split('-')[1]),
              front: card.front,
              back: card.back,
              example: card.example,
            }))}
          />
        </div>

        {/* Quiz Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Conjugation Quiz</h3>
            <select
              value={selectedQuizCategory}
              onChange={(e) => setSelectedQuizCategory(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {quizContent.categories.map((category, index) => (
                <option key={category.name} value={index}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <Quiz
            title={quizContent.categories[selectedQuizCategory].name}
            questions={quizContent.categories[selectedQuizCategory].questions.map((question) => ({
              id: Number(question.id.split('-')[1]),
              question: question.question,
              options: question.options,
              correctAnswer: question.correctAnswer,
              explanation: question.explanation,
            }))}
          />
        </div>
      </div>

      {/* Instructions for Adding Content */}
      <Card intent="secondary" size="lg">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Adding Your Own Content</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              To add more flashcards and quiz questions, edit the following files:
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">src/content/conjugation/flashcards.json</code>
                {' '}for flashcards
              </li>
              <li>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">src/content/conjugation/quizzes.json</code>
                {' '}for quiz questions
              </li>
            </ul>
            <p className="text-gray-600">
              Follow the existing format in these files to add new categories, cards, or questions.
              Each item requires a unique ID within its category.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default VerbConjugationPractice; 