import { motion } from 'framer-motion';

interface StepNavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isNextEnabled: boolean;
}

export default function StepNavigationButtons({ onPrevious, onNext, isFirstStep, isNextEnabled }: StepNavigationButtonsProps) {
  // Scroll to top utilitaire
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    scrollToTop();
    onPrevious();
  };

  const handleNext = () => {
    scrollToTop();
    onNext();
  };

  return (
    <div className="flex justify-between pt-6">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isFirstStep ? 0.5 : 1 }}
        onClick={handlePrevious}
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
        animate={{ opacity: isNextEnabled ? 1 : 0.5 }}
        onClick={handleNext}
        disabled={!isNextEnabled}
        whileHover={isNextEnabled ? { scale: 1.05 } : {}}
        whileTap={isNextEnabled ? { scale: 0.95 } : {}}
        className="
          px-6 py-2 bg-blue-600 text-white rounded-lg 
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        Next
      </motion.button>
    </div>
  );
}
