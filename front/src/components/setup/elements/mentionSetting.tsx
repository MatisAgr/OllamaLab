import { HiOutlineInformationCircle } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function MentionSetting() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-2 mb-5 text-s text-blue-900 dark:text-blue-100 font-medium flex items-center gap-2"
    >
      <HiOutlineInformationCircle className="w-4 h-4 text-blue-500 dark:text-blue-200 flex-shrink-0" />
      <span>This setting can be changed later in the application settings.</span>
    </motion.div>
  );
}
