'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
}

const Quiz = ({ title, questions }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set<number>());

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const hasAnswered = answeredQuestions.has(currentQuestion.id);

  const handleAnswerSelect = (answer: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer);
    setShowExplanation(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion.id));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  return (
    <div className="space-y-4">
      <Card intent="primary" size="lg">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <p className="text-sm font-medium text-blue-600">
                Score: {score}/{questions.length}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-xl text-gray-900">{currentQuestion.question}</p>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={hasAnswered}
                    className={`p-4 text-left rounded-lg transition-colors ${
                      hasAnswered
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-900'
                          : option === selectedAnswer
                          ? 'bg-red-100 border-red-500 text-red-900'
                          : 'bg-gray-50 border-gray-200 text-gray-500'
                        : 'bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-900">
                    <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {isCorrect ? '✓ Correct! ' : '✗ Incorrect. '}
                    </span>
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={handlePreviousQuestion}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Previous
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Reset Quiz
            </button>
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {answeredQuestions.size === questions.length && (
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <p className="text-lg font-medium text-blue-900">
            Quiz Complete! Final Score: {score}/{questions.length}
          </p>
          <p className="text-sm text-blue-600 mt-2">
            {score === questions.length
              ? '¡Perfecto! You got all questions correct!'
              : 'Keep practicing to improve your score!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz; 