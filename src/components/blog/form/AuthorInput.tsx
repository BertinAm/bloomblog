'use client';

import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';

interface AuthorInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AuthorInput({ value, onChange }: AuthorInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Author Name
      </label>
      <input
        type="text"
        id="author"
        name="author"
        value={value}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </motion.div>
  );
} 