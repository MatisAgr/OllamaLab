import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';
import APP_NAME from '../../constants/AppName';
import APP_LOGO from '../../constants/AppLogo';

export default function FinalStep({ config, onPrevious, isFirstStep }: SetupStepProps) {
  const handleFinishSetup = () => {
    // Save configuration and redirect to main app
    console.log('Setup completed:', config);
    // TODO: Save to backend/localStorage and redirect
    alert('Setup completed successfully! Redirecting to OllamaLab...');
  };

  return (
    <div className="space-y-8 text-center">
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
            className="h-20 w-20 drop-shadow-lg" 
          />
          <motion.div
            className="absolute -inset-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
        >
          🎉 Setup Complete!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-300"
        >
          Your {APP_NAME} workspace is ready to use!
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 max-w-md mx-auto"
      >
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
          Configuration Summary
        </h3>
        <div className="space-y-2 text-sm text-green-800 dark:text-green-200 text-left">
          <div>✓ Language: {config.language || 'English'}</div>
          <div>✓ Database: {config.database?.type || 'SQLite'}</div>
          <div>✓ Theme: {config.theme?.mode || 'System'}</div>
          <div>✓ User: {config.user?.name || 'Anonymous'}</div>
          <div>✓ Multi-user: {config.multiUser?.enabled ? 'Enabled' : 'Disabled'}</div>
          <div>✓ Rate limiting: {config.rateLimit?.enabled ? 'Enabled' : 'Disabled'}</div>
          <div>✓ Ollama: {config.ollama?.url || 'Not configured'}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 max-w-md mx-auto"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🚀 What's Next?
        </h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <div>• Start using AI-powered features</div>
          <div>• Customize your workspace</div>
          <div>• Explore all available tools</div>
          <div>• Invite team members (if multi-user enabled)</div>
        </div>
      </motion.div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onPrevious}
          disabled={isFirstStep}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <motion.button
          onClick={handleFinishSetup}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
        >
          Launch {APP_NAME} 🚀
        </motion.button>
      </div>
    </div>
  );
}
