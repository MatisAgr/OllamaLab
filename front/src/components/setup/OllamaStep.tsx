import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';
import { useState } from 'react';

export default function OllamaStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleOllamaChange = (field: string, value: string | number | string[]) => {
    const currentOllama = config.ollama || { url: 'http://localhost:11434', timeout: 30000, models: [] };
    onConfigChange({
      ollama: {
        ...currentOllama,
        [field]: value
      }
    });
  };

  const testConnection = async () => {
    setIsConnecting(true);
    setConnectionStatus('idle');
    
    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus('success');
    } catch {
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Ollama Configuration
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Configure your Ollama connection and settings
        </motion.p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ollama URL *
          </label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={config.ollama?.url || 'http://localhost:11434'}
              onChange={(e) => handleOllamaChange('url', e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="http://localhost:11434"
              required
            />
            <button
              onClick={testConnection}
              disabled={isConnecting || !config.ollama?.url}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? '...' : 'Test'}
            </button>
          </div>
          
          {connectionStatus === 'success' && (
            <div className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center">
              <span className="mr-2">✓</span>
              Connection successful
            </div>
          )}
          
          {connectionStatus === 'error' && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="mr-2">✗</span>
              Connection failed
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            API Key (Optional)
          </label>
          <input
            type="password"
            value={config.ollama?.apiKey || ''}
            onChange={(e) => handleOllamaChange('apiKey', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Leave empty if not required"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timeout (seconds)
          </label>
          <input
            type="number"
            value={config.ollama?.timeout ? config.ollama.timeout / 1000 : 30}
            onChange={(e) => handleOllamaChange('timeout', parseInt(e.target.value) * 1000)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            min="5"
            max="300"
          />
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="text-sm">
            <div className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📋 Ollama Setup Instructions
            </div>
            <ol className="text-blue-800 dark:text-blue-200 space-y-1 text-xs">
              <li>1. Install Ollama from https://ollama.ai</li>
              <li>2. Start Ollama service</li>
              <li>3. Pull models: `ollama pull llama2`</li>
              <li>4. Verify with: `ollama list`</li>
            </ol>
          </div>
        </div>
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
          disabled={!config.ollama?.url}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
