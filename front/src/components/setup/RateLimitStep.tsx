import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';

export default function RateLimitStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleRateLimitChange = (field: string, value: boolean | number) => {
    const currentRateLimit = config.rateLimit || { enabled: true, requestsPerMinute: 60, requestsPerHour: 1000 };
    onConfigChange({
      rateLimit: {
        ...currentRateLimit,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Rate Limiting
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Configure API request limits to prevent abuse
        </motion.p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Enable Rate Limiting</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Protect your API from excessive requests</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={config.rateLimit?.enabled || true}
              onChange={(e) => handleRateLimitChange('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {config.rateLimit?.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Requests Per Minute
              </label>
              <input
                type="number"
                value={config.rateLimit.requestsPerMinute || 60}
                onChange={(e) => handleRateLimitChange('requestsPerMinute', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                min="1"
                max="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Requests Per Hour
              </label>
              <input
                type="number"
                value={config.rateLimit.requestsPerHour || 1000}
                onChange={(e) => handleRateLimitChange('requestsPerHour', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                min="1"
                max="10000"
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrevious}
          disabled={isFirstStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
