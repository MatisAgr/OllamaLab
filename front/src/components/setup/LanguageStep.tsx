import { motion } from 'framer-motion';
import StepNavigationButtons from './elements/StepNavigationButtons';
import MentionSetting from './elements/mentionSetting';
import { MdLock, MdTranslate } from 'react-icons/md';
import { FiFlag } from 'react-icons/fi';
import US from 'country-flag-icons/react/3x2/US';
import FR from 'country-flag-icons/react/3x2/FR';
import ES from 'country-flag-icons/react/3x2/ES';
import DE from 'country-flag-icons/react/3x2/DE';
import IT from 'country-flag-icons/react/3x2/IT';
import PT from 'country-flag-icons/react/3x2/PT';
import CN from 'country-flag-icons/react/3x2/CN';
import JP from 'country-flag-icons/react/3x2/JP';
import { SetupStepProps, SUPPORTED_LANGUAGES } from '../../types/setup';

export default function LanguageStep({ config, onConfigChange, onNext, onPrevious, isFirstStep }: SetupStepProps) {
  const handleLanguageSelect = (languageCode: string, available: boolean) => {
    if (available) {
      onConfigChange({ language: languageCode });
    }
  };

  const getFlagIcon = (countryCode: string, available: boolean, isSmall = false) => {
    const flagProps = {
      className: isSmall ? 'w-6 h-4' : 'w-full h-full',
      style: { 
        filter: available ? 'none' : 'grayscale(100%)',
        borderRadius: isSmall ? '2px' : '0px',
        width: isSmall ? '24px' : '100%',
        height: isSmall ? '16px' : '100%',
        objectFit: 'cover' as const,
        objectPosition: 'center'
      }
    };
    
    // Utilise les vrais drapeaux SVG selon le pays
    switch (countryCode) {
      case 'US':
        return <US {...flagProps} />;
      case 'FR':
        return <FR {...flagProps} />;
      case 'ES':
        return <ES {...flagProps} />;
      case 'DE':
        return <DE {...flagProps} />;
      case 'IT':
        return <IT {...flagProps} />;
      case 'PT':
        return <PT {...flagProps} />;
      case 'CN':
        return <CN {...flagProps} />;
      case 'JP':
        return <JP {...flagProps} />;
      default:
        return <FiFlag className={`text-4xl ${available ? 'text-blue-500' : 'text-gray-400'}`} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Choose Your Language
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Select your preferred language for the application interface
        </motion.p>
      </div>
      {/* Mention: paramètre modifiable plus tard */}
      <MentionSetting />

      {/* Language Options */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {SUPPORTED_LANGUAGES.map((language, index) => (
          <motion.div
            key={language.code}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="relative"
          >
            <motion.button
              whileHover={language.available ? { scale: 1.05 } : {}}
              whileTap={language.available ? { scale: 0.95 } : {}}
              onClick={() => handleLanguageSelect(language.code, language.available)}
              disabled={!language.available}
              className={`
                relative w-full h-32 p-0 rounded-xl border-2 transition-all duration-300 overflow-hidden group
                ${config.language === language.code && language.available
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                  : language.available
                    ? 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                    : 'border-gray-200 dark:border-gray-600 opacity-60 cursor-not-allowed'
                }
              `}
            >
              {/* Flag Background - dépasse de la case si nécessaire */}
              <div className="">
                {getFlagIcon(language.countryCode, language.available)}
              </div>

              {/* Overlay avec flou pour améliorer le contraste */}
              <div className={`absolute inset-0 rounded-xl backdrop-blur-[3px]
                ${language.available 
                  ? 'bg-black/50 group-hover:bg-black/60' 
                  : 'bg-black/70'
                }
                transition-all duration-300
              `} />

              {/* Overlay supplémentaire pour les langues sélectionnées */}
              {config.language === language.code && language.available && (
                <div className="absolute inset-0 rounded-xl bg-blue-500/20" />
              )}
              
              {/* Contenu texte avec ombre portée renforcée */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                {/* Coming Soon Badge avec cadenas pour langues indisponibles */}
                {!language.available && (
                  <div className="absolute top-2 right-2 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-full px-2 py-1 flex items-center space-x-1">
                    <MdLock className="text-amber-700 dark:text-amber-300 text-xs" />
                    <span className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                      Soon
                    </span>
                  </div>
                )}

                <div className={`
                  text-xl font-bold mb-1
                  ${config.language === language.code && language.available
                    ? 'text-white'
                    : 'text-white'
                  }
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                  text-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
                `}>
                  {language.countryCode}
                </div>
                
                {/* Language Name */}
                <div className={`
                  text-xs font-medium
                  ${config.language === language.code && language.available
                    ? 'text-white'
                    : 'text-white'
                  }
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                  text-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]
                `}>
                  {language.name}
                </div>
              </div>
              
              {/* Lock Icon for unavailable languages - supprimé */}
            </motion.button>
            
            {/* Coming Soon Badge avec cadenas - supprimé car maintenant dans le bouton */}
          </motion.div>
        ))}
      </motion.div>

      {/* Translation in Progress Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-4"
      >
        <div className="flex items-center space-x-3">
          <MdTranslate className="text-amber-600 dark:text-amber-400 text-xl" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-medium text-sm">
              Traductions en cours
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
              Nous travaillons activement sur les traductions pour les autres langues. 
              Seuls l'anglais et le français sont actuellement disponibles.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Selected Language Info */}
      {config.language && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <span className="text-green-600 dark:text-green-400">✓</span>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-4 flex items-center justify-center">
                {config.language && getFlagIcon(
                  SUPPORTED_LANGUAGES.find(l => l.code === config.language)?.countryCode || '',
                  true,
                  true
                )}
              </div>
              <span className="text-green-800 dark:text-green-200 font-medium">
                {SUPPORTED_LANGUAGES.find(l => l.code === config.language)?.name} sélectionné
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <StepNavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstStep={isFirstStep}
        isNextEnabled={!!config.language}
      />
    </div>
  );
}
