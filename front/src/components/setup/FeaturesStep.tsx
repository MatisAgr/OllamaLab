import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';

export default function FeaturesStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = config.features || {};
    onConfigChange({
      features: {
        ...currentFeatures,
        [feature]: !currentFeatures[feature]
      }
    });
  };

  const features = [
    { id: 'summarize', name: 'Summarize', icon: '📄', description: 'Summarize text content or documents' },
    { id: 'translate', name: 'Translate', icon: '🌐', description: 'Translate text between languages' },
    { id: 'chat', name: 'Chat', icon: '💬', description: 'Engage in conversational interactions' },
    { id: 'email', name: 'Email', icon: '✉️', description: 'Compose and format emails' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', description: 'Create LinkedIn posts and messages' },
    { id: 'tutorial', name: 'Tutorial', icon: '📚', description: 'Step-by-step guides and tutorials' },
    { id: 'code', name: 'Code', icon: '💻', description: 'Generate code snippets and programming help' },
    { id: 'search', name: 'Search', icon: '🔍', description: 'Search for information and resources' },
    { id: 'image', name: 'Image', icon: '🖼️', description: 'Process and analyze images' },
    { id: 'eventCalendar', name: 'Event Calendar', icon: '📅', description: 'Manage events and reminders' },
    { id: 'ganttChart', name: 'Gantt Chart', icon: '📊', description: 'Create project planning charts' },
    { id: 'taskPlanner', name: 'Task Planner', icon: '✅', description: 'Plan and organize tasks' }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Select Features
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Choose which AI-powered features you want to enable
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${config.features?.[feature.id] 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
              }
            `}
            onClick={() => handleFeatureToggle(feature.id)}
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <div className="font-medium text-sm text-gray-900 dark:text-white mb-1">
              {feature.name}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300">
              {feature.description}
            </div>
            <div className="mt-3">
              <div className={`
                w-4 h-4 rounded border-2 transition-all duration-200
                ${config.features?.[feature.id]
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300 dark:border-gray-600'
                }
              `}>
                {config.features?.[feature.id] && (
                  <div className="text-white text-xs leading-none">✓</div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => {
            const allFeatures = {};
            features.forEach(f => allFeatures[f.id] = true);
            onConfigChange({ features: allFeatures });
          }}
          className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          Select All
        </button>
        <button
          onClick={() => {
            const noFeatures = {};
            features.forEach(f => noFeatures[f.id] = false);
            onConfigChange({ features: noFeatures });
          }}
          className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          Select None
        </button>
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
