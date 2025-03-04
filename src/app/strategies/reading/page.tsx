'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import VerbConjugationSection from '@/components/ui/VerbConjugationSection';

// Define the strategies directly in this file since we're having issues with the import
const strategies = [
  {
    title: 'Context Clues',
    description: 'Use surrounding words and sentences to understand unfamiliar vocabulary.',
    examples: [
      {
        text: 'Mi hermano es muy atlético. Juega al fútbol y corre todos los días.',
        explanation: 'Even if you don\'t know "atlético", the context about playing soccer and running helps you understand it means "athletic".',
      },
    ],
  },
  {
    title: 'Cognates',
    description: 'Identify words that are similar in Spanish and English.',
    examples: [
      {
        text: 'El restaurante es elegante y el ambiente es romántico.',
        explanation: 'The words "restaurante", "elegante", and "romántico" are similar to their English counterparts.',
      },
    ],
  },
  {
    title: 'Verb Tense Recognition',
    description: 'Look for verb endings to understand when actions occur.',
    examples: [
      {
        text: 'Ayer comí (past) en el restaurante. Hoy como (present) en casa. Mañana comeré (future) con mis amigos.',
        explanation: 'Different verb endings indicate different time periods.',
      },
    ],
  },
];

interface Question {
  question: string;
  context: string;
}

// Type for error handling
type ApiErrorType = Error;

const ReadingStrategiesPage = () => {
  const [practiceText, setPracticeText] = useState(`
María es estudiante de medicina en la universidad. Todos los días, ella se despierta temprano y toma el autobús para ir a sus clases. Le encanta estudiar el cuerpo humano y ayudar a las personas. En el futuro, quiere ser doctora en un hospital grande.

Después de sus clases, María trabaja en una cafetería. El ambiente es agradable y sus compañeros de trabajo son muy simpáticos. A veces, cuando tiene tiempo libre, lee libros de medicina o practica con otros estudiantes.

Los fines de semana, María visita a su familia. Su madre prepara comida deliciosa y todos conversan sobre sus experiencias de la semana. María está ocupada, pero está feliz porque está siguiendo su sueño de ser doctora.
`);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [textReview, setTextReview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [questionsError, setQuestionsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleGenerateText = async () => {
    try {
      setIsGenerating(true);
      setGenerateError(null);
      
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate',
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate text');
      }
      
      setPracticeText(data.result);
    } catch (error: unknown) {
      console.error('Error generating text:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate text. Please try again.';
      setGenerateError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReviewText = async () => {
    try {
      setIsReviewing(true);
      setReviewError(null);
      
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'review',
          text: practiceText,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to review text');
      }
      
      setTextReview(data.result);
    } catch (error: unknown) {
      console.error('Error reviewing text:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to review text. Please try again.';
      setReviewError(errorMessage);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleGenerateQuestions = useCallback(async () => {
    try {
      setIsGeneratingQuestions(true);
      setQuestionsError(null);
      
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate-questions',
          text: practiceText,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }
      
      const parsedQuestions = JSON.parse(data.result);
      setQuestions(parsedQuestions);
      setSelectedQuestion(0);
      setUserAnswer('');
      setFeedback(null);
    } catch (error: unknown) {
      console.error('Error generating questions:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate questions. Please try again.';
      setQuestionsError(errorMessage);
    } finally {
      setIsGeneratingQuestions(false);
    }
  }, [practiceText]);

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) {
      setSubmitError('Please write an answer before submitting.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'review-answer',
          text: practiceText,
          question: questions[selectedQuestion].question,
          answer: userAnswer,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to review answer');
      }
      
      setFeedback(data.result);
    } catch (error: unknown) {
      console.error('Error submitting answer:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit answer. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (practiceText && !questions.length) {
      handleGenerateQuestions();
    }
  }, [practiceText, questions.length, handleGenerateQuestions]);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-gray-900">Reading Strategies</h1>
        <p className="text-lg text-gray-600">
          Learn effective strategies for understanding Spanish texts and improve your reading comprehension.
        </p>
      </motion.div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Key Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card intent="primary" size="lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {strategy.title}
                </h3>
                <p className="text-gray-600 mb-4">{strategy.description}</p>
                {strategy.examples.map((example, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 italic mb-2">{example.text}</p>
                    <p className="text-sm text-gray-600">{example.explanation}</p>
                  </div>
                ))}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <VerbConjugationSection />

      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Practice Text</h2>
          <div className="space-x-4">
            <button
              onClick={handleGenerateText}
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate New Text'}
            </button>
            <button
              onClick={handleReviewText}
              disabled={isReviewing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isReviewing ? 'Reviewing...' : 'Review Text'}
            </button>
          </div>
        </div>

        {generateError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {generateError}
          </div>
        )}

        <Card intent="secondary" size="lg">
          <div className="space-y-4">
            <p className="text-gray-900 leading-relaxed whitespace-pre-line">
              {practiceText}
            </p>
            <div className="border-t pt-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Reading Tips:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Look for cognates like &ldquo;estudiante&rdquo;, &ldquo;medicina&rdquo;, and &ldquo;universidad&rdquo;</li>
                <li>Use context clues to understand words like &ldquo;temprano&rdquo; (context: waking up)</li>
                <li>Notice verb tenses to understand when actions occur</li>
              </ul>
            </div>
          </div>
        </Card>

        {reviewError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            {reviewError}
          </div>
        )}

        {textReview && (
          <Card intent="accent" size="lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Text Review</h3>
            <div className="prose prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: textReview.replace(/\n/g, '<br />') }} />
            </div>
          </Card>
        )}
      </section>

      {questions.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Comprehension Questions</h2>
          
          {questionsError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              {questionsError}
            </div>
          )}
          
          <Card intent="primary" size="lg">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Question {selectedQuestion + 1} of {questions.length}
                </h3>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setSelectedQuestion((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
                      setUserAnswer('');
                      setFeedback(null);
                    }}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      setSelectedQuestion((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
                      setUserAnswer('');
                      setFeedback(null);
                    }}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-lg text-gray-900 mb-2">{questions[selectedQuestion].question}</p>
                  <p className="text-sm text-gray-600 italic">{questions[selectedQuestion].context}</p>
                </div>

                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write your answer in Spanish (3-5 sentences)..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={isGeneratingQuestions}
                />

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    {submitError}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={isSubmitting || !userAnswer.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Reviewing...' : 'Submit Answer'}
                  </button>
                </div>
              </div>

              {feedback && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg prose prose-blue max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
                </div>
              )}
            </div>
          </Card>
        </section>
      )}
    </div>
  );
};

export default ReadingStrategiesPage; 