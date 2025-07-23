import { motion } from 'framer-motion';
import MentionSetting from './elements/mentionSetting';
import StepNavigationButtons from './elements/StepNavigationButtons';
import { SetupStepProps } from '../../types/setup';

type FeatureKey = keyof NonNullable<SetupStepProps['config']['features']>;

export default function FeaturesStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleFeatureToggle = (feature: FeatureKey) => {
    const currentFeatures = config.features || {};
    onConfigChange({
      features: {
        ...currentFeatures,
        [feature]: !currentFeatures[feature]
      }
    });
  };

  const featuresList: { id: FeatureKey; name: string; icon: string; description: string }[] = [
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
      {/* Mention: paramètre modifiable plus tard */}
      <MentionSetting />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {featuresList.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${(config.features && config.features[feature.id])
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
                ${(config.features && config.features[feature.id])
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300 dark:border-gray-600'
                }
              `}>
                {(config.features && config.features[feature.id]) && (
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
            const allFeatures = Object.fromEntries(featuresList.map(f => [f.id, true])) as Record<FeatureKey, boolean>;
            onConfigChange({ features: allFeatures });
          }}
          className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          Select All
        </button>
        <button
          onClick={() => {
            const noFeatures = Object.fromEntries(featuresList.map(f => [f.id, false])) as Record<FeatureKey, boolean>;
            onConfigChange({ features: noFeatures });
          }}
          className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          Select None
        </button>
      </div>

      <StepNavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isNextEnabled={true}
      />
    </div>
  );
}
