
import { motion, AnimatePresence } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';
import StepNavigationButtons from './elements/StepNavigationButtons';

export default function UserStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleUserChange = (field: string, value: string) => {
    const currentUser = config.user || { name: '', avatar: '', password: '' };
    onConfigChange({
      user: {
        ...currentUser,
        [field]: value
      }
    });
  };

  const handleMultiUserChange = (field: string, value: boolean | string | number) => {
    const currentMultiUser = config.multiUser || { enabled: false };
    onConfigChange({
      multiUser: {
        ...currentMultiUser,
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
        {/* Multi-user switch */}
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Enable Multi-User</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Allow multiple users to access this instance</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.multiUser?.enabled || false}
              onChange={(e) => handleMultiUserChange('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

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

        <AnimatePresence initial={false}>
          {config.multiUser?.enabled && (
            <motion.div
              key="password-field"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Password *
              </label>
              <input
                type="password"
                value={config.user?.password || ''}
                onChange={(e) => handleUserChange('password', e.target.value)}
                className="
                  w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-gray-700 dark:text-white
                  transition-colors duration-200
                "
                placeholder="Choose a password for your profile"
                required
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Required for multi-user mode
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
      <StepNavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isNextEnabled={!!config.user?.name && (!config.multiUser?.enabled || !!config.user?.password)}
      />
    </div>
  );
}
