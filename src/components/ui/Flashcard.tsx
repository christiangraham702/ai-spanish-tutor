'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';

interface FlashcardItem {
  id: number;
  front: string;
  back: string;
  example: string;
}

interface FlashcardProps {
  title: string;
  cards: FlashcardItem[];
}

const Flashcard = ({ title, cards }: FlashcardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === ' ' || e.key === 'Enter') {
      handleFlip();
    }
  };

  return (
    <div className="space-y-4">
      <Card intent="primary" size="lg">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">
              Card {currentCardIndex + 1} of {cards.length}
            </p>
          </div>

          <div
            className="relative h-48 cursor-pointer"
            onClick={handleFlip}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label="Flip flashcard"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentCardIndex + (isFlipped ? '-back' : '-front')}
                initial={{ 
                  opacity: 0,
                  x: direction * 50
                }}
                animate={{ 
                  opacity: 1,
                  x: 0
                }}
                exit={{ 
                  opacity: 0,
                  x: -direction * 50
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white rounded-lg shadow-sm"
              >
                {isFlipped ? (
                  <div className="space-y-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {cards[currentCardIndex].back}
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      {cards[currentCardIndex].example}
                    </p>
                  </div>
                ) : (
                  <p className="text-xl font-medium text-gray-900">
                    {cards[currentCardIndex].front}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              aria-label="Previous card"
            >
              Previous
            </button>
            <button
              onClick={handleFlip}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              aria-label="Flip card"
            >
              Flip
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              aria-label="Next card"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      <div className="text-sm text-gray-600 text-center">
        Tip: Use arrow keys to navigate, space or enter to flip
      </div>
    </div>
  );
};

export default Flashcard; 