'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const HomePage = () => {
  const sections = [
    {
      title: 'Grammar Concepts',
      description: 'Master essential Spanish grammar including preterite tense, past tenses, and formal conjugations.',
      href: '/grammar/preterite',
      color: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Vocabulary',
      description: 'Build your Spanish vocabulary with focused sections on food, health, and body parts.',
      href: '/vocabulary/food',
      color: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      borderColor: 'border-green-200',
    },
    {
      title: 'Learning Strategies',
      description: 'Develop effective reading and listening strategies for better comprehension.',
      href: '/strategies/reading',
      color: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 sm:text-5xl"
        >
          Spanish Exam Review
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto text-lg text-gray-600"
        >
          Your comprehensive guide to mastering Spanish grammar, vocabulary, and exam strategies.
        </motion.p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {sections.map((section, index) => (
          <Link
            key={section.title}
            href={section.href}
            className={`block p-6 rounded-lg border ${section.color} ${section.hoverColor} ${section.borderColor} transition-colors duration-200`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-lg border border-gray-200 p-8 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-600 mb-6">
          Choose any section above to begin your Spanish exam preparation journey.
          Each section includes detailed explanations, examples, and interactive exercises.
        </p>
        <Link
          href="/grammar/preterite"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Start with Grammar
        </Link>
      </motion.section>
    </div>
  );
};

export default HomePage;
