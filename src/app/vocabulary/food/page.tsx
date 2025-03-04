'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Flashcard from '@/components/ui/Flashcard';
import Quiz from '@/components/ui/Quiz';

const categories = [
  {
    title: 'Basic Food Items',
    words: [
      { id: 1, front: 'el pan', back: 'bread', example: 'Me gusta el pan fresco.' },
      { id: 2, front: 'la carne', back: 'meat', example: 'No como carne roja.' },
      { id: 3, front: 'el pescado', back: 'fish', example: 'El pescado es saludable.' },
      { id: 4, front: 'el arroz', back: 'rice', example: 'Comemos arroz con frijoles.' },
      { id: 5, front: 'las frutas', back: 'fruits', example: 'Me encantan las frutas frescas.' },
    ],
  },
  {
    title: 'Drinks',
    words: [
      { id: 1, front: 'el agua', back: 'water', example: 'Bebo mucha agua cada día.' },
      { id: 2, front: 'el jugo', back: 'juice', example: 'Me gusta el jugo de naranja.' },
      { id: 3, front: 'el café', back: 'coffee', example: 'Tomo café por la mañana.' },
      { id: 4, front: 'el té', back: 'tea', example: 'Prefiero el té verde.' },
      { id: 5, front: 'la leche', back: 'milk', example: 'Bebo leche con cereales.' },
    ],
  },
  {
    title: 'Restaurant Phrases',
    words: [
      { id: 1, front: 'Quisiera pedir...', back: 'I would like to order...', example: 'Quisiera pedir una ensalada, por favor.' },
      { id: 2, front: '¿Qué recomienda?', back: 'What do you recommend?', example: '¿Qué recomienda para el plato principal?' },
      { id: 3, front: 'La cuenta, por favor', back: 'The bill, please', example: '¿Puede traer la cuenta, por favor?' },
      { id: 4, front: 'Estoy listo/a para ordenar', back: 'I am ready to order', example: 'Estoy listo para ordenar mi comida.' },
      { id: 5, front: '¿Tienen platos vegetarianos?', back: 'Do you have vegetarian dishes?', example: '¿Tienen platos vegetarianos en el menú?' },
    ],
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is "el pan" in English?',
    options: ['meat', 'bread', 'fish', 'rice'],
    correctAnswer: 'bread',
    explanation: '"El pan" means bread in Spanish.',
  },
  {
    id: 2,
    question: 'Which phrase would you use to ask for the bill?',
    options: [
      'Quisiera pedir',
      'La cuenta, por favor',
      '¿Qué recomienda?',
      'Estoy listo para ordenar',
    ],
    correctAnswer: 'La cuenta, por favor',
    explanation: '"La cuenta, por favor" is used to ask for the bill in a restaurant.',
  },
  {
    id: 3,
    question: 'What is "el jugo" in English?',
    options: ['water', 'coffee', 'juice', 'milk'],
    correctAnswer: 'juice',
    explanation: '"El jugo" means juice in Spanish.',
  },
];

const FoodVocabularyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-gray-900">Food Vocabulary</h1>
        <p className="text-lg text-gray-600">
          Learn essential Spanish vocabulary for food, drinks, and restaurant phrases.
        </p>
      </motion.div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                intent={selectedCategory === index ? 'accent' : 'primary'}
                size="md"
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedCategory(index)}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.words.length} words and phrases
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Flashcards</h2>
        <Flashcard
          title={categories[selectedCategory].title}
          cards={categories[selectedCategory].words}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Practice Quiz</h2>
        <Quiz
          title="Test Your Food Vocabulary Knowledge"
          questions={quizQuestions}
        />
      </section>
    </div>
  );
};

export default FoodVocabularyPage; 