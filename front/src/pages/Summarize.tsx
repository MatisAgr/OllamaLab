import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiLoader, FiCheckCircle } from 'react-icons/fi';
import APP_LOGO from '../constants/AppLogo';
import APP_NAME from '../constants/AppName';

const Summarize = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setSummary('');
    setError('');
    try {
      // Simule une requête API (remplace par ton appel réel)
      await new Promise((res) => setTimeout(res, 1200));
      if (!input.trim()) throw new Error('Veuillez entrer un texte à résumer.');
      setSummary('Ceci est un exemple de résumé généré pour votre texte.');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40"
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <img className="w-10 h-10 animate-pulse" src={APP_LOGO} alt="Logo" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {APP_NAME} <span className="text-base font-normal text-gray-500">- Résumeur</span>
            </h1>
            <p className="text-xs text-gray-600">Générez un résumé clair et concis de vos documents ou textes bruts.</p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-xl border border-white/40 p-8 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <FiFileText className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Résumé de texte ou document</h2>
          </div>
          <textarea
            className="w-full min-h-[120px] max-h-60 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-y bg-white/80 text-gray-900 placeholder-gray-400 transition-all mb-4"
            placeholder="Collez ou saisissez votre texte à résumer..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSummarize}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <FiLoader className="animate-spin w-5 h-5" />
              ) : (
                <FiCheckCircle className="w-5 h-5" />
              )}
              Résumer
            </motion.button>
          </div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-4 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="mt-8 p-5 rounded-xl bg-blue-50 border border-blue-100 text-gray-900 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
                  <FiCheckCircle className="w-5 h-5" /> Résumé généré
                </div>
                <div className="whitespace-pre-line text-gray-800 text-base leading-relaxed">{summary}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Summarize;
