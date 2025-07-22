import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';

export default function UserStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleUserChange = (field: string, value: string) => {
    const currentUser = config.user || { name: '', email: '', avatar: '' };
    onConfigChange({
      user: {
        ...currentUser,
        [field]: value
      }
    });
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
          User Profile Setup
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Tell us about yourself to personalize your experience
        </motion.p>
      </div>

      {/* Profile Form */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6 max-w-md mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={config.user?.name || ''}
            onChange={(e) => handleUserChange('name', e.target.value)}
            className="
              w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
              rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-700 dark:text-white
              transition-colors duration-200
            "
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={config.user?.email || ''}
            onChange={(e) => handleUserChange('email', e.target.value)}
            className="
              w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
              rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-700 dark:text-white
              transition-colors duration-200
            "
            placeholder="your.email@example.com"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Used for notifications and account recovery
          </div>
        </div>
      </motion.div>

      {/* Profile Preview */}
      {config.user?.name && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {config.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {config.user.name}
              </div>
              {config.user.email && (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {config.user.email}
                </div>
              )}
            </div>
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
          animate={{ opacity: config.user?.name ? 1 : 0.5 }}
          onClick={onNext}
          disabled={!config.user?.name}
          whileHover={config.user?.name ? { scale: 1.05 } : {}}
          whileTap={config.user?.name ? { scale: 0.95 } : {}}
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
