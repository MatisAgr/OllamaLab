import { motion } from 'framer-motion';
import { SetupStepProps } from '../../types/setup';
import { useState } from 'react';
import StepNavigationButtons from './elements/StepNavigationButtons';

export default function OllamaStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleOllamaChange = (field: string, value: string | number | string[]) => {
    const currentOllama = config.ollama || { url: 'http://localhost:11434', timeout: 30000, models: [], rateLimit: { enabled: false, requestsPerMinute: 60, requestsPerHour: 1000 } };
    onConfigChange({
      ollama: {
        ...currentOllama,
        [field]: value
      }
    });
  };

  const handleRateLimitChange = (field: string, value: boolean | number) => {
    const currentOllama = config.ollama || { url: 'http://localhost:11434', timeout: 30000, models: [], rateLimit: { enabled: false, requestsPerMinute: 60, requestsPerHour: 1000 } };
    const currentRateLimit = currentOllama.rateLimit || { enabled: false, requestsPerMinute: 60, requestsPerHour: 1000 };
    onConfigChange({
      ollama: {
        ...currentOllama,
        rateLimit: {
          ...currentRateLimit,
          [field]: value
        }
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
        {/* Notice Ollama requis */}
        <div className="mb-2">
          <span className="inline-block bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 px-3 py-1 rounded-full text-xs font-semibold">Ollama est requis pour utiliser l'application</span>
        </div>

        {/* Setup instructions au dessus du champ URL */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
          <div className="text-sm">
            <div className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📋 Instructions d'installation Ollama
            </div>
            <ol className="text-blue-800 dark:text-blue-200 space-y-1 text-xs list-decimal list-inside">
              <li>Téléchargez Ollama depuis <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="underline">https://ollama.ai</a></li>
              <li>Lancez le service Ollama</li>
              <li>Téléchargez au moins un modèle&nbsp;: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ollama pull gemma3</code> <span className="text-green-700 dark:text-green-300 font-semibold">(recommandé)</span></li>
              <li>Vérifiez la présence d'au moins un modèle avec&nbsp;: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">ollama list</code></li>
            </ol>
          </div>
        </div>

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
              Connexion réussie
            </div>
          )}
          {connectionStatus === 'error' && (
            <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <span className="mr-2">✗</span>
              Échec de la connexion
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



        {/* Rate Limit Section en bulle séparée en bas */}
        <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Enable Rate Limiting</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Protect your API from excessive requests</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.ollama && config.ollama.rateLimit ? config.ollama.rateLimit.enabled : false}
                onChange={(e) => handleRateLimitChange('enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <motion.div
            initial={false}
            animate={{ height: config.ollama && config.ollama.rateLimit && config.ollama.rateLimit.enabled ? 'auto' : 0, opacity: config.ollama && config.ollama.rateLimit && config.ollama.rateLimit.enabled ? 1 : 0 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            {config.ollama && config.ollama.rateLimit && config.ollama.rateLimit.enabled && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Requests Per Minute
                  </label>
                  <input
                    type="number"
                    value={config.ollama.rateLimit.requestsPerMinute || 60}
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
                    value={config.ollama.rateLimit.requestsPerHour || 1000}
                    onChange={(e) => handleRateLimitChange('requestsPerHour', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    min="1"
                    max="10000"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <StepNavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isNextEnabled={!!config.ollama?.url}
      />
    </div>
  );
}
