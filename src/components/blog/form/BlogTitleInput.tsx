'use client';

import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface BlogTitleInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function BlogTitleInput({ value, onChange, error }: BlogTitleInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.label 
        htmlFor="title" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Blog Title <span className="text-red-500">*</span>
      </motion.label>
      <motion.input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={handleChange}
        placeholder="Enter a catchy title for your blog"
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
        } bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
        required
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        whileFocus={{ scale: 1.01, borderColor: '#3b82f6' }}
      />
      {error && (
        <motion.p 
          className="text-red-500 text-sm mt-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
} 