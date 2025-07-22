export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Translations = {
  en: {
    // App
    appName: 'OllamaLab',
    
    // Welcome Step
    'welcome.title': 'Welcome to OllamaLab',
    'welcome.description': 'Your AI-powered productivity companion. Let\'s configure your perfect workspace with pre-configured models for summarizing, translating, coding, and much more.',
    'welcome.quickSetup': 'Quick Setup Process',
    'welcome.setupInfo': 'This setup wizard will help you configure your language preferences, database, theme, Ollama connection, and select the AI features you want to use. The entire process takes just a few minutes!',
    'welcome.getStarted': 'Get Started',
    
    // Language Step
    'language.title': 'Choose Your Language',
    'language.description': 'Select your preferred language for the application interface',
    
    // Database Step
    'database.title': 'Database Configuration',
    'database.description': 'Choose your database type and configure connection settings',
    
    // Common
    'common.previous': 'Previous',
    'common.next': 'Next',
    'common.finish': 'Finish',
    'common.optional': '(Optional)',
    'common.required': '*',
  },
  
  fr: {
    // App
    appName: 'OllamaLab',
    
    // Welcome Step
    'welcome.title': 'Bienvenue dans OllamaLab',
    'welcome.description': 'Votre compagnon de productivité alimenté par l\'IA. Configurons votre espace de travail parfait avec des modèles pré-configurés pour résumer, traduire, coder et bien plus encore.',
    'welcome.quickSetup': 'Processus de Configuration Rapide',
    'welcome.setupInfo': 'Cet assistant de configuration vous aidera à configurer vos préférences linguistiques, votre base de données, votre thème, votre connexion Ollama et à sélectionner les fonctionnalités IA que vous souhaitez utiliser. Le processus complet ne prend que quelques minutes !',
    'welcome.getStarted': 'Commencer',
    
    // Language Step
    'language.title': 'Choisissez Votre Langue',
    'language.description': 'Sélectionnez votre langue préférée pour l\'interface de l\'application',
    
    // Database Step
    'database.title': 'Configuration de la Base de Données',
    'database.description': 'Choisissez votre type de base de données et configurez les paramètres de connexion',
    
    // Common
    'common.previous': 'Précédent',
    'common.next': 'Suivant',
    'common.finish': 'Terminer',
    'common.optional': '(Optionnel)',
    'common.required': '*',
  }
};

export const getTranslation = (key: string, language: string = 'en'): string => {
  return translations[language]?.[key] || translations['en'][key] || key;
};
