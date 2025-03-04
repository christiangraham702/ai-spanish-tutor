'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import ConjugationTable from '@/components/ui/ConjugationTable';
import Quiz from '@/components/ui/Quiz';

const PreteritePage = () => {
  const regularArVerb = {
    verb: 'hablar',
    tense: 'Pretérito',
    conjugations: [
      { pronoun: 'yo', form: 'hablé', translation: 'I spoke' },
      { pronoun: 'tú', form: 'hablaste', translation: 'you spoke' },
      { pronoun: 'él/ella/usted', form: 'habló', translation: 'he/she/you (formal) spoke' },
      { pronoun: 'nosotros', form: 'hablamos', translation: 'we spoke' },
      { pronoun: 'ellos/ellas/ustedes', form: 'hablaron', translation: 'they/you (plural) spoke' },
    ],
  };

  const irregularVerbs = [
    {
      verb: 'ser/ir',
      tense: 'Pretérito',
      conjugations: [
        { pronoun: 'yo', form: 'fui', translation: 'I was/went' },
        { pronoun: 'tú', form: 'fuiste', translation: 'you were/went' },
        { pronoun: 'él/ella/usted', form: 'fue', translation: 'he/she/you (formal) was/went' },
        { pronoun: 'nosotros', form: 'fuimos', translation: 'we were/went' },
        { pronoun: 'ellos/ellas/ustedes', form: 'fueron', translation: 'they/you (plural) were/went' },
      ],
    },
    {
      verb: 'tener',
      tense: 'Pretérito',
      conjugations: [
        { pronoun: 'yo', form: 'tuve', translation: 'I had' },
        { pronoun: 'tú', form: 'tuviste', translation: 'you had' },
        { pronoun: 'él/ella/usted', form: 'tuvo', translation: 'he/she/you (formal) had' },
        { pronoun: 'nosotros', form: 'tuvimos', translation: 'we had' },
        { pronoun: 'ellos/ellas/ustedes', form: 'tuvieron', translation: 'they/you (plural) had' },
      ],
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'Which form of &quot;hablar&quot; is correct for &quot;yo&quot; in the preterite tense?',
      options: ['hablé', 'hablo', 'hablaba', 'hablaré'],
      correctAnswer: 'hablé',
      explanation: 'For regular -AR verbs in the preterite tense, &quot;yo&quot; form ends in -é.',
    },
    {
      id: 2,
      question: 'What is the correct preterite form of &quot;ser&quot; for &quot;ellos&quot;?',
      options: ['son', 'eran', 'fueron', 'sean'],
      correctAnswer: 'fueron',
      explanation: '&quot;Ser&quot; is irregular in the preterite tense. &quot;Fueron&quot; is the correct form for &quot;ellos/ellas/ustedes&quot;.',
    },
    {
      id: 3,
      question: 'Which sentence correctly uses the preterite tense?',
      options: [
        'Ayer como una manzana.',
        'Ayer comí una manzana.',
        'Ayer comía una manzana.',
        'Ayer comeré una manzana.',
      ],
      correctAnswer: 'Ayer comí una manzana.',
      explanation: 'The preterite tense is used for completed actions in the past. &quot;Comí&quot; is the correct preterite form of &quot;comer&quot;.',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-gray-900">El Pretérito (The Preterite Tense)</h1>
        <p className="text-lg text-gray-600">
          The preterite tense is used to describe completed actions in the past. It answers the question
          &quot;What happened?&quot; or &quot;What did you do?&quot;
        </p>
      </motion.div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Regular -AR Verbs</h2>
        <Card intent="accent" size="md">
          <p className="text-gray-600 mb-4">
            Regular -AR verbs follow a consistent pattern in the preterite tense. Here&apos;s how to conjugate
            them using &quot;hablar&quot; (to speak) as an example:
          </p>
          <ConjugationTable {...regularArVerb} showTranslations />
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Common Irregular Verbs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {irregularVerbs.map((verb, index) => (
            <motion.div
              key={verb.verb}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <ConjugationTable {...verb} showTranslations />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">When to Use the Preterite</h2>
        <Card intent="primary" size="lg">
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <div>
                <p className="font-medium text-gray-900">Completed Actions</p>
                <p className="text-gray-600">
                  Use the preterite for actions that were completed in the past.
                  <br />
                  <span className="italic">Example: &ldquo;Ayer comí una ensalada.&rdquo; (Yesterday I ate a salad.)</span>
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <div>
                <p className="font-medium text-gray-900">Specific Time Periods</p>
                <p className="text-gray-600">
                  Use it for actions that occurred during a specific time period.
                  <br />
                  <span className="italic">Example: &ldquo;El año pasado viajé a España.&rdquo; (Last year I traveled to Spain.)</span>
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-500 font-bold">•</span>
              <div>
                <p className="font-medium text-gray-900">Sequential Actions</p>
                <p className="text-gray-600">
                  Use it for actions that occurred one after another.
                  <br />
                  <span className="italic">Example: &ldquo;Me levanté, me duché y salí.&rdquo; (I got up, showered, and left.)</span>
                </p>
              </div>
            </li>
          </ul>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Practice Quiz</h2>
        <Quiz
          title="Test Your Knowledge of the Preterite Tense"
          questions={quizQuestions}
        />
      </section>
    </div>
  );
};

export default PreteritePage; 