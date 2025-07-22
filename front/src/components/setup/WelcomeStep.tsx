import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';
import APP_NAME from '../../constants/AppName';
import APP_LOGO from '../../constants/AppLogo';

export default function WelcomeStep({ onNext, isFirstStep, isLastStep }: SetupStepProps) {
  return (
    <div className="text-center space-y-8">
      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center"
      >
        <div className="relative">
          <img 
            src={APP_LOGO} 
            alt={APP_NAME} 
            className="h-24 w-24 drop-shadow-lg" 
          />
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{APP_NAME}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your AI-powered productivity companion. Let's configure your perfect workspace with 
          pre-configured models for summarizing, translating, coding, and much more.
        </p>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        {[
          { name: 'Summarize', icon: '📄', color: 'from-blue-500 to-cyan-500' },
          { name: 'Translate', icon: '🌐', color: 'from-green-500 to-teal-500' },
          { name: 'Chat', icon: '💬', color: 'from-purple-500 to-pink-500' },
          { name: 'Code', icon: '💻', color: 'from-orange-500 to-red-500' },
          { name: 'Email', icon: '✉️', color: 'from-indigo-500 to-blue-500' },
          { name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' },
          { name: 'Tutorial', icon: '📚', color: 'from-yellow-500 to-orange-500' },
          { name: 'Search', icon: '🔍', color: 'from-gray-500 to-gray-700' },
        ].map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
            className={`
              p-4 rounded-lg bg-gradient-to-br ${feature.color} 
              text-white shadow-lg hover:shadow-xl transition-shadow
            `}
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <div className="text-sm font-medium">{feature.name}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Setup Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-2xl mx-auto"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🚀 Quick Setup Process
        </h3>
        <p className="text-blue-700 dark:text-blue-200 text-sm">
          This setup wizard will help you configure your language preferences, database, 
          theme, Ollama connection, and select the AI features you want to use. 
          The entire process takes just a few minutes!
        </p>
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="flex justify-center pt-4"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
            text-white font-semibold rounded-lg shadow-lg 
            hover:from-blue-700 hover:to-purple-700 
            transition-all duration-200 
            flex items-center space-x-2
          "
        >
          <span>Get Started</span>
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
