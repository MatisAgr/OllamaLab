import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SetupConfig, SetupStep } from '../types/setup';
import APP_NAME from '../constants/AppName';
import APP_LOGO from '../constants/AppLogo';

// Import setup step components
import WelcomeStep from '../components/setup/WelcomeStep';
import LanguageStep from '../components/setup/LanguageStep';
import DatabaseStep from '../components/setup/DatabaseStep';
import ThemeStep from '../components/setup/ThemeStep';
import UserStep from '../components/setup/UserStep';
import MultiUserStep from '../components/setup/MultiUserStep';
import RateLimitStep from '../components/setup/RateLimitStep';
import OllamaStep from '../components/setup/OllamaStep';
import FeaturesStep from '../components/setup/FeaturesStep';
import FinalStep from '../components/setup/FinalStep';

export default function Setup() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [config, setConfig] = useState<Partial<SetupConfig>>({
    language: 'en',
    theme: {
      mode: 'system',
      primaryColor: '#3B82F6',
      fontSize: 'medium'
    },
    multiUser: {
      enabled: false
    },
    rateLimit: {
      enabled: true,
      requestsPerMinute: 60,
      requestsPerHour: 1000
    },
    ollama: {
      url: 'http://localhost:11434',
      timeout: 30000,
      models: []
    },
    features: {
      summarize: true,
      translate: true,
      chat: true,
      email: true,
      linkedin: true,
      tutorial: true,
      code: true,
      search: true,
      image: true,
      eventCalendar: true,
      ganttChart: true,
      taskPlanner: true
    }
  });

  const setupSteps: SetupStep[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Welcome to OllamaLab',
      component: WelcomeStep,
      isRequired: true,
      isCompleted: false
    },
    {
      id: 'language',
      title: 'Language',
      description: 'Choose your preferred language',
      component: LanguageStep,
      isRequired: true,
      isCompleted: !!config.language
    },
    {
      id: 'database',
      title: 'Database',
      description: 'Configure your database',
      component: DatabaseStep,
      isRequired: true,
      isCompleted: !!config.database?.type
    },
    {
      id: 'theme',
      title: 'Theme',
      description: 'Customize your appearance',
      component: ThemeStep,
      isRequired: false,
      isCompleted: !!config.theme?.mode
    },
    {
      id: 'user',
      title: 'User Profile',
      description: 'Set up your profile',
      component: UserStep,
      isRequired: true,
      isCompleted: !!config.user?.name
    },
    {
      id: 'multiuser',
      title: 'Multi-User',
      description: 'Configure multi-user settings',
      component: MultiUserStep,
      isRequired: false,
      isCompleted: config.multiUser?.enabled !== undefined
    },
    {
      id: 'ratelimit',
      title: 'Rate Limiting',
      description: 'Configure API rate limits',
      component: RateLimitStep,
      isRequired: false,
      isCompleted: !!config.rateLimit?.enabled
    },
    {
      id: 'ollama',
      title: 'Ollama Config',
      description: 'Configure Ollama connection',
      component: OllamaStep,
      isRequired: true,
      isCompleted: !!config.ollama?.url
    },
    {
      id: 'features',
      title: 'Features',
      description: 'Select your desired features',
      component: FeaturesStep,
      isRequired: false,
      isCompleted: true
    },
    {
      id: 'final',
      title: 'Complete',
      description: 'Finalize your setup',
      component: FinalStep,
      isRequired: true,
      isCompleted: false
    }
  ];

  const [steps, setSteps] = useState(setupSteps);

  const currentStep = steps[currentStepIndex];
  const CurrentStepComponent = currentStep.component;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleConfigChange = (newConfig: Partial<SetupConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  useEffect(() => {
    // Update step completion status when config changes
    setSteps(prevSteps => 
      prevSteps.map(step => {
        switch (step.id) {
          case 'language':
            return { ...step, isCompleted: !!config.language };
          case 'database':
            return { ...step, isCompleted: !!config.database?.type };
          case 'theme':
            return { ...step, isCompleted: !!config.theme?.mode };
          case 'user':
            return { ...step, isCompleted: !!config.user?.name };
          case 'multiuser':
            return { ...step, isCompleted: config.multiUser?.enabled !== undefined };
          case 'ratelimit':
            return { ...step, isCompleted: !!config.rateLimit?.enabled !== undefined };
          case 'ollama':
            return { ...step, isCompleted: !!config.ollama?.url };
          default:
            return step;
        }
      })
    );
  }, [config]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={APP_LOGO} alt={APP_NAME} className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {APP_NAME} Setup
              </h1>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentStep.title}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
          
          {/* Steps Navigation */}
          <div className="mt-6 flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${index < currentStepIndex 
                      ? 'bg-green-500 text-white' 
                      : index === currentStepIndex
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }
                  `}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: index === currentStepIndex ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {index < currentStepIndex ? '✓' : index + 1}
                </motion.div>
                {index < steps.length - 1 && (
                  <div 
                    className={`
                      w-8 h-0.5 mx-2
                      ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <CurrentStepComponent
              config={config}
              onConfigChange={handleConfigChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstStep={currentStepIndex === 0}
              isLastStep={currentStepIndex === steps.length - 1}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
