'use client';

import { motion } from 'framer-motion';
import Card from './Card';
import VerbConjugationPractice from './VerbConjugationPractice';

interface ConjugationPattern {
  ending: string;
  yo: string;
  tu: string;
  el: string;
  nosotros: string;
  ellos: string;
  example?: string;
}

interface IrregularVerb {
  verb: string;
  tense: string;
  conjugations: {
    yo: string;
    tu: string;
    el: string;
    nosotros: string;
    ellos: string;
  };
  notes?: string;
}

const regularPatterns: { [key: string]: ConjugationPattern[] } = {
  'Present Tense': [
    {
      ending: '-ar',
      yo: '-o',
      tu: '-as',
      el: '-a',
      nosotros: '-amos',
      ellos: '-an',
      example: 'hablar → hablo, hablas, habla, hablamos, hablan',
    },
    {
      ending: '-er',
      yo: '-o',
      tu: '-es',
      el: '-e',
      nosotros: '-emos',
      ellos: '-en',
      example: 'comer → como, comes, come, comemos, comen',
    },
    {
      ending: '-ir',
      yo: '-o',
      tu: '-es',
      el: '-e',
      nosotros: '-imos',
      ellos: '-en',
      example: 'vivir → vivo, vives, vive, vivimos, viven',
    },
  ],
  'Preterite Tense': [
    {
      ending: '-ar',
      yo: '-é',
      tu: '-aste',
      el: '-ó',
      nosotros: '-amos',
      ellos: '-aron',
      example: 'hablar → hablé, hablaste, habló, hablamos, hablaron',
    },
    {
      ending: '-er/-ir',
      yo: '-í',
      tu: '-iste',
      el: '-ió',
      nosotros: '-imos',
      ellos: '-ieron',
      example: 'comer → comí, comiste, comió, comimos, comieron',
    },
  ],
  'Future Tense': [
    {
      ending: 'all verbs',
      yo: '-é',
      tu: '-ás',
      el: '-á',
      nosotros: '-emos',
      ellos: '-án',
      example: 'hablar → hablaré, hablarás, hablará, hablaremos, hablarán',
    },
  ],
};

const irregularVerbs: IrregularVerb[] = [
  {
    verb: 'ser',
    tense: 'Present',
    conjugations: {
      yo: 'soy',
      tu: 'eres',
      el: 'es',
      nosotros: 'somos',
      ellos: 'son',
    },
  },
  {
    verb: 'ir',
    tense: 'Present',
    conjugations: {
      yo: 'voy',
      tu: 'vas',
      el: 'va',
      nosotros: 'vamos',
      ellos: 'van',
    },
  },
  {
    verb: 'ser/ir',
    tense: 'Preterite',
    conjugations: {
      yo: 'fui',
      tu: 'fuiste',
      el: 'fue',
      nosotros: 'fuimos',
      ellos: 'fueron',
    },
    notes: 'Both ser and ir share the same preterite forms',
  },
];

const stemChanges = [
  {
    pattern: 'e → ie',
    examples: ['pensar → pienso', 'querer → quiero'],
    explanation: 'Occurs in all forms except nosotros/vosotros',
  },
  {
    pattern: 'o → ue',
    examples: ['dormir → duermo', 'poder → puedo'],
    explanation: 'Occurs in all forms except nosotros/vosotros',
  },
  {
    pattern: 'e → i',
    examples: ['pedir → pido', 'servir → sirvo'],
    explanation: 'Common in -ir verbs, occurs in all forms except nosotros/vosotros',
  },
];

const VerbConjugationSection = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Verb Conjugation Patterns</h2>

      {/* Regular Patterns */}
      {Object.entries(regularPatterns).map(([tense, patterns]) => (
        <div key={tense} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">{tense}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patterns.map((pattern) => (
              <Card key={pattern.ending} intent="secondary" size="md">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">
                    Verbs ending in {pattern.ending}
                  </h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-gray-600">yo</div>
                      <div className="font-medium">{pattern.yo}</div>
                      <div className="text-gray-600">tú</div>
                      <div className="font-medium">{pattern.tu}</div>
                      <div className="text-gray-600">él/ella/usted</div>
                      <div className="font-medium">{pattern.el}</div>
                      <div className="text-gray-600">nosotros</div>
                      <div className="font-medium">{pattern.nosotros}</div>
                      <div className="text-gray-600">ellos/ellas/ustedes</div>
                      <div className="font-medium">{pattern.ellos}</div>
                    </div>
                    {pattern.example && (
                      <p className="text-sm text-gray-600 italic mt-2">
                        Example: {pattern.example}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Irregular Verbs */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Common Irregular Verbs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {irregularVerbs.map((verb) => (
            <Card key={`${verb.verb}-${verb.tense}`} intent="accent" size="md">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  {verb.verb} ({verb.tense})
                </h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-600">yo</div>
                    <div className="font-medium">{verb.conjugations.yo}</div>
                    <div className="text-gray-600">tú</div>
                    <div className="font-medium">{verb.conjugations.tu}</div>
                    <div className="text-gray-600">él/ella/usted</div>
                    <div className="font-medium">{verb.conjugations.el}</div>
                    <div className="text-gray-600">nosotros</div>
                    <div className="font-medium">{verb.conjugations.nosotros}</div>
                    <div className="text-gray-600">ellos/ellas/ustedes</div>
                    <div className="font-medium">{verb.conjugations.ellos}</div>
                  </div>
                  {verb.notes && (
                    <p className="text-sm text-gray-600 italic mt-2">{verb.notes}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stem Changes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Common Stem Changes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stemChanges.map((change) => (
            <Card key={change.pattern} intent="primary" size="md">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">{change.pattern}</h4>
                <div className="space-y-2">
                  <p className="text-gray-600">{change.explanation}</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900">Examples:</p>
                    {change.examples.map((example, index) => (
                      <p key={index} className="text-sm text-gray-600">{example}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Practice Section */}
      <VerbConjugationPractice />
    </section>
  );
};

export default VerbConjugationSection; 