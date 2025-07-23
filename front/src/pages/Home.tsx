import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFileText, 
  FiGlobe, 
  FiMessageCircle, 
  FiMail, 
  FiLinkedin, 
  FiBookOpen, 
  FiCode, 
  FiSearch, 
  FiImage, 
  FiCalendar, 
  FiBarChart, 
  FiCheckSquare,
  FiUser,
  FiSettings,
  FiBell,
  FiStar
} from 'react-icons/fi';

// Constantes simulées
import APP_LOGO from '@/constants/AppLogo';
import APP_NAME from '@/constants/AppName';

const Launcher = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    {
      id: 'summarize',
      title: 'Summarize',
      description: 'Résume vos textes et documents en quelques clics',
      icon: FiFileText,
      color: 'from-blue-500 to-blue-600',
      path: '/summarize'
    },
    {
      id: 'translate',
      title: 'Translate',
      description: 'Traduction instantanée entre toutes les langues',
      icon: FiGlobe,
      color: 'from-green-500 to-green-600',
      path: '/translate'
    },
    {
      id: 'chat',
      title: 'Chat',
      description: 'Conversation intelligente avec notre IA avancée',
      icon: FiMessageCircle,
      color: 'from-purple-500 to-purple-600',
      path: '/chat'
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Composez des emails professionnels parfaits',
      icon: FiMail,
      color: 'from-red-500 to-red-600',
      path: '/email'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      description: 'Optimisez votre présence professionnelle',
      icon: FiLinkedin,
      color: 'from-blue-600 to-blue-700',
      path: '/linkedin'
    },
    {
      id: 'tutorial',
      title: 'Tutorial',
      description: 'Guides détaillés pour tous vos projets',
      icon: FiBookOpen,
      color: 'from-orange-500 to-orange-600',
      path: '/tutorial'
    },
    {
      id: 'code',
      title: 'Code',
      description: 'Génération et assistance de code intelligente',
      icon: FiCode,
      color: 'from-gray-600 to-gray-700',
      path: '/code'
    },
    {
      id: 'search',
      title: 'Search',
      description: 'Recherche avancée sur le web et vos données',
      icon: FiSearch,
      color: 'from-teal-500 to-teal-600',
      path: '/search'
    },
    {
      id: 'image',
      title: 'Image',
      description: 'Analyse et traitement d\'images par IA',
      icon: FiImage,
      color: 'from-pink-500 to-pink-600',
      path: '/image'
    },
    {
      id: 'calendar',
      title: 'Event Calendar',
      description: 'Gestion complète de vos événements',
      icon: FiCalendar,
      color: 'from-indigo-500 to-indigo-600',
      path: '/calendar'
    },
    {
      id: 'gantt',
      title: 'Gantt Chart',
      description: 'Planification visuelle de vos projets',
      icon: FiBarChart,
      color: 'from-yellow-500 to-yellow-600',
      path: '/gantt'
    },
    {
      id: 'tasks',
      title: 'Task Planner',
      description: 'Organisation intelligente de vos tâches',
      icon: FiCheckSquare,
      color: 'from-emerald-500 to-emerald-600',
      path: '/tasks'
    }
  ];

  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation d'entrée au chargement
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation décalée pour les cartes (pour Framer Motion)
  const getCardDelay = (index: number) => index * 0.08; // en secondes

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isLoaded ? 0 : -100, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: isLoaded ? 0 : -40, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center space-x-3"
            >
              <motion.img className="w-10 h-10" src={APP_LOGO} alt="Logo" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {APP_NAME}
                </h1>
                <p className="text-sm text-gray-600">Votre assistant IA tout-en-un</p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: isLoaded ? 0 : 40, opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center space-x-4"
            >
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
                <FiBell className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300" onClick={() => alert('Navigation vers paramètres')}>
                <FiSettings className="w-5 h-5 text-gray-600" />
              </motion.button>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 14px rgba(99,102,241,0.15)" }}
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  <FiUser className="w-4 h-4" />
                  <span className="font-medium">Profil</span>
                </motion.button>
                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            U
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Utilisateur</p>
                            <p className="text-sm text-gray-500">user@example.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                          <FiStar className="w-4 h-4 text-gray-400" />
                          <span>Favoris</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 transition-colors">
                          <FiSettings className="w-4 h-4 text-gray-400" />
                          <span>Paramètres</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: isLoaded ? 0 : 40, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 max-w-2xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une fonctionnalité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 focus:scale-105 focus:shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: isLoaded ? 0 : 40, opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-8 text-center"
        >
          <p className="text-gray-600">
            {filteredFeatures.length} fonctionnalité{filteredFeatures.length > 1 ? 's' : ''} disponible{filteredFeatures.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.button
                  key={feature.id}
                  onClick={() => alert(`Navigation vers ${feature.title}`)}
                  className="group w-full text-left"
                  initial={{ y: 32, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 32, opacity: 0, scale: 0.95 }}
                  transition={{ delay: getCardDelay(index), duration: 0.3, type: "spring", stiffness: 80 }}
                  whileHover={{ rotate: 2, scale: 1.05, boxShadow: "0 8px 32px rgba(99,102,241,0.10)" }}
                >
                  <motion.div
                    className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/30 h-full`}
                    whileHover={{ rotate: 3, scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="mt-4 flex justify-end">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        whileHover={{ x: 4, backgroundColor: "#DBEAFE" }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* No Results */}
        <AnimatePresence>
          {filteredFeatures.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600">Essayez avec d'autres mots-clés</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: isLoaded ? 0 : 40, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="bg-white/50 backdrop-blur-sm border-t border-white/20 mt-12"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 {APP_NAME}. Tous droits réservés.</p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Launcher;