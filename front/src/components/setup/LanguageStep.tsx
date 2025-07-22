import { motion } from 'framer-motion';
import { SetupStepProps, SUPPORTED_LANGUAGES } from '../../types/setup';

export default function LanguageStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleLanguageSelect = (languageCode: string) => {
    onConfigChange({ language: languageCode });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Choose Your Language
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Select your preferred language for the application interface
        </motion.p>
      </div>

      {/* Language Options */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {SUPPORTED_LANGUAGES.map((language, index) => (
          <motion.button
            key={language.code}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLanguageSelect(language.code)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200
              ${config.language === language.code
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
              }
            `}
          >
            <div className="text-2xl mb-2">{language.flag}</div>
            <div className="font-medium text-sm">{language.name}</div>
          </motion.button>
        ))}
      </motion.div>

      {/* Selected Language Info */}
      {config.language && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <span className="text-green-800 dark:text-green-200">
              Selected: {SUPPORTED_LANGUAGES.find(l => l.code === config.language)?.name}
            </span>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isFirstStep ? 0.5 : 1 }}
          onClick={onPrevious}
          disabled={isFirstStep}
          className="
            px-6 py-2 border border-gray-300 dark:border-gray-600 
            text-gray-700 dark:text-gray-300 rounded-lg 
            hover:bg-gray-50 dark:hover:bg-gray-700 
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
        >
          Previous
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: config.language ? 1 : 0.5 }}
          onClick={onNext}
          disabled={!config.language}
          whileHover={config.language ? { scale: 1.05 } : {}}
          whileTap={config.language ? { scale: 0.95 } : {}}
          className="
            px-6 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
          "
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}
