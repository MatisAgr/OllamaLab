import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';

export default function ThemeStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleThemeChange = (field: string, value: string) => {
    const currentTheme = config.theme || {
      mode: 'system' as const,
      primaryColor: '#3B82F6',
      fontSize: 'medium' as const
    };
    
    onConfigChange({
      theme: {
        ...currentTheme,
        [field]: value
      }
    });
  };

  const themeOptions = [
    { value: 'light', name: 'Light', icon: '☀️', description: 'Clean and bright interface' },
    { value: 'dark', name: 'Dark', icon: '🌙', description: 'Easy on the eyes' },
    { value: 'system', name: 'System', icon: '💻', description: 'Follow system preference' }
  ];

  const colorOptions = [
    { value: '#3B82F6', name: 'Blue', color: 'bg-blue-500' },
    { value: '#8B5CF6', name: 'Purple', color: 'bg-purple-500' },
    { value: '#EF4444', name: 'Red', color: 'bg-red-500' },
    { value: '#10B981', name: 'Green', color: 'bg-green-500' },
    { value: '#F59E0B', name: 'Yellow', color: 'bg-yellow-500' },
    { value: '#6B7280', name: 'Gray', color: 'bg-gray-500' }
  ];

  const fontSizeOptions = [
    { value: 'small', name: 'Small', description: 'Compact interface' },
    { value: 'medium', name: 'Medium', description: 'Standard size (recommended)' },
    { value: 'large', name: 'Large', description: 'Larger text and elements' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Customize Your Theme
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Personalize your workspace appearance
        </motion.p>
      </div>

      {/* Theme Mode Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Theme Mode
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange('mode', option.value)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200
                ${config.theme?.mode === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                }
              `}
            >
              <div className="text-2xl mb-2">{option.icon}</div>
              <div className="font-medium text-sm text-gray-900 dark:text-white">
                {option.name}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {option.description}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Primary Color Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Primary Color
        </h3>
        
        <div className="grid grid-cols-6 gap-3">
          {colorOptions.map((color, index) => (
            <motion.button
              key={color.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleThemeChange('primaryColor', color.value)}
              className={`
                w-12 h-12 rounded-lg ${color.color} 
                border-4 transition-all duration-200
                ${config.theme?.primaryColor === color.value
                  ? 'border-gray-900 dark:border-white shadow-lg'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }
              `}
              title={color.name}
            />
          ))}
        </div>
      </motion.div>

      {/* Font Size Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Font Size
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {fontSizeOptions.map((option, index) => (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleThemeChange('fontSize', option.value)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-200
                ${config.theme?.fontSize === option.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700'
                }
              `}
            >
              <div className={`
                font-medium text-gray-900 dark:text-white
                ${option.value === 'small' ? 'text-sm' : option.value === 'large' ? 'text-lg' : 'text-base'}
              `}>
                {option.name}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {option.description}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Theme Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="border-t border-gray-200 dark:border-gray-600 pt-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Preview
        </h3>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: config.theme?.primaryColor || '#3B82F6' }}
            />
            <div className={`
              font-semibold text-gray-900 dark:text-white
              ${config.theme?.fontSize === 'small' ? 'text-sm' : 
                config.theme?.fontSize === 'large' ? 'text-lg' : 'text-base'}
            `}>
              OllamaLab Interface
            </div>
          </div>
          <div className={`
            text-gray-600 dark:text-gray-300
            ${config.theme?.fontSize === 'small' ? 'text-xs' : 
              config.theme?.fontSize === 'large' ? 'text-base' : 'text-sm'}
          `}>
            This is how your interface will look with the selected theme settings.
          </div>
          <div className="mt-3">
            <button 
              className={`
                px-4 py-2 rounded text-white text-sm
                ${config.theme?.fontSize === 'small' ? 'px-3 py-1 text-xs' : 
                  config.theme?.fontSize === 'large' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm'}
              `}
              style={{ backgroundColor: config.theme?.primaryColor || '#3B82F6' }}
            >
              Sample Button
            </button>
          </div>
        </div>
      </motion.div>

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
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            px-6 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-all duration-200
          "
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}
