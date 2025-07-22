export interface SetupConfig {
  // Language settings
  language: string;
  
  // Database configuration
  database: {
    type: 'sqlite' | 'mongodb';
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
  };
  
  // Theme preferences
  theme: {
    mode: 'light' | 'dark' | 'system';
    primaryColor: string;
    fontSize: 'small' | 'medium' | 'large';
  };
  
  // User preferences
  user: {
    name: string;
    email?: string;
    avatar?: string;
  };
  
  // Multi-user settings
  multiUser: {
    enabled: boolean;
    adminPassword?: string;
    maxUsers?: number;
  };
  
  // Rate limiting
  rateLimit: {
    enabled: boolean;
    requestsPerMinute: number;
    requestsPerHour: number;
  };
  
  // Ollama configuration
  ollama: {
    url: string;
    apiKey?: string;
    models: string[];
    timeout: number;
  };
  
  // Features configuration
  features: {
    summarize: boolean;
    translate: boolean;
    chat: boolean;
    email: boolean;
    linkedin: boolean;
    tutorial: boolean;
    code: boolean;
    search: boolean;
    image: boolean;
    eventCalendar: boolean;
    ganttChart: boolean;
    taskPlanner: boolean;
  };
}

export interface SetupStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<SetupStepProps>;
  isRequired: boolean;
  isCompleted: boolean;
}

export interface SetupStepProps {
  config: Partial<SetupConfig>;
  onConfigChange: (config: Partial<SetupConfig>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface Language {
  code: string;
  name: string;
  countryCode: string;
  available: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', countryCode: 'US', available: true },
  { code: 'fr', name: 'Français', countryCode: 'FR', available: true },
  { code: 'es', name: 'Español', countryCode: 'ES', available: false },
  { code: 'de', name: 'Deutsch', countryCode: 'DE', available: false },
  { code: 'it', name: 'Italiano', countryCode: 'IT', available: false },
  { code: 'pt', name: 'Português', countryCode: 'PT', available: false },
  { code: 'zh', name: '中文', countryCode: 'CN', available: false },
  { code: 'ja', name: '日本語', countryCode: 'JP', available: false },
];
