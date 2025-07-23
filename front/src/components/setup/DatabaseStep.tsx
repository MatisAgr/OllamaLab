import { motion } from 'framer-motion';
import StepNavigationButtons from './elements/StepNavigationButtons';
import { SiSqlite, SiMongodb } from 'react-icons/si';
import { SetupStepProps } from '../../types/setup';

export default function DatabaseStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleDatabaseTypeChange = (type: 'sqlite' | 'mongodb') => {
    onConfigChange({
      database: {
        ...config.database,
        type,
        // Reset other fields when changing type
        host: type === 'sqlite' ? undefined : config.database?.host || 'localhost',
        port: type === 'sqlite' ? undefined : config.database?.port || 27017,
        username: type === 'sqlite' ? undefined : config.database?.username || '',
        password: type === 'sqlite' ? undefined : config.database?.password || '',
        database: type === 'sqlite' ? undefined : config.database?.database || ''
      }
    });
  };

  const handleDatabaseConfigChange = (field: string, value: string | number) => {
    if (config.database?.type) {
      onConfigChange({
        database: {
          ...config.database,
          type: config.database.type,
          [field]: value
        }
      });
    }
  };

  const databaseTypes = [
    {
      type: 'sqlite' as const,
      name: 'SQLite',
      description: 'Local file-based database (Recommended for single user)',
      icon: SiSqlite,
      info: 'No configuration needed'
    },
    {
      type: 'mongodb' as const,
      name: 'MongoDB',
      description: 'NoSQL document database (Good for multi-user)',
      icon: SiMongodb,
      info: 'Requires server configuration'
    }
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
          Database Configuration
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Choose your database type and configure connection settings
        </motion.p>
      </div>

      {/* Database Type Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Database Type
        </h3>
        
        <div className="grid gap-4">
          {databaseTypes.map((db, index) => (
            <motion.button
              key={db.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98, 
                transition: { duration: 0.1 }
              }}
              onClick={() => handleDatabaseTypeChange(db.type)}
              className={`
                group p-4 rounded-lg border-2 text-left transition-all duration-300 ease-out
                ${config.database?.type === db.type
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/25'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-700 hover:shadow-md'
                }
              `}
            >
              <div className="flex items-start space-x-4">
                <motion.div 
                  className="text-3xl"
                  whileHover={{ 
                    scale: 1.1, 
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <db.icon 
                    className={`transition-colors duration-300 ${
                      config.database?.type === db.type
                        ? db.type === 'sqlite' 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500'
                    }`}
                  />
                </motion.div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {db.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {db.description}
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {db.info}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Database Configuration Form */}
      {config.database?.type && config.database.type !== 'sqlite' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 border-t border-gray-200 dark:border-gray-600 pt-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Connection Settings
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Host
              </label>
              <input
                type="text"
                value={config.database.host || ''}
                onChange={(e) => handleDatabaseConfigChange('host', e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-gray-700 dark:text-white
                "
                placeholder="localhost"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Port
              </label>
              <input
                type="number"
                value={config.database.port || ''}
                onChange={(e) => handleDatabaseConfigChange('port', parseInt(e.target.value))}
                className="
                  w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-gray-700 dark:text-white
                "
                placeholder="27017"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={config.database.username || ''}
                onChange={(e) => handleDatabaseConfigChange('username', e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-gray-700 dark:text-white
                "
                placeholder="database username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={config.database.password || ''}
                onChange={(e) => handleDatabaseConfigChange('password', e.target.value)}
                className="
                  w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  dark:bg-gray-700 dark:text-white
                "
                placeholder="database password"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Database Name
            </label>
            <input
              type="text"
              value={config.database.database || ''}
              onChange={(e) => handleDatabaseConfigChange('database', e.target.value)}
              className="
                w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                dark:bg-gray-700 dark:text-white
              "
              placeholder="ollamalab"
            />
          </div>
        </motion.div>
      )}

      {/* SQLite Info */}
      {config.database?.type === 'sqlite' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
            <div className="text-blue-800 dark:text-blue-200">
              <div className="font-semibold mb-1">SQLite Configuration</div>
              <div className="text-sm">
                SQLite will automatically create a local database file. No additional configuration needed!
                The database file will be stored in your application data directory.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <StepNavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isNextEnabled={!!config.database?.type}
      />
    </div>
  );
}
