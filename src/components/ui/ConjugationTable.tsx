import { motion } from 'framer-motion';
import Card from './Card';

interface Conjugation {
  pronoun: string;
  form: string;
  translation?: string;
}

interface ConjugationTableProps {
  verb: string;
  tense: string;
  conjugations: Conjugation[];
  showTranslations?: boolean;
}

const ConjugationTable = ({
  verb,
  tense,
  conjugations,
  showTranslations = false,
}: ConjugationTableProps) => {
  return (
    <Card intent="secondary" size="md" className="overflow-hidden">
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {verb} <span className="text-gray-500">({tense})</span>
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {conjugations.map((conjugation, index) => (
            <motion.div
              key={conjugation.pronoun}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-1"
            >
              <div className="text-sm font-medium text-gray-500">
                {conjugation.pronoun}
              </div>
              <div className="text-lg font-medium text-gray-900">
                {conjugation.form}
              </div>
              {showTranslations && conjugation.translation && (
                <div className="text-sm text-gray-600 italic">
                  {conjugation.translation}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ConjugationTable; 