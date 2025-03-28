'use client';

import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagsInput({ tags, onChange }: TagsInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on enter, comma, or space
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !tags.includes(trimmedValue)) {
        const newTags = [...tags, trimmedValue];
        onChange(newTags);
        setInputValue('');
      }
    }
    
    // Remove last tag on backspace when input is empty
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      onChange(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Tags (optional)
      </label>
      
      <motion.div 
        className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 min-h-12 focus-within:ring-2 focus-within:ring-blue-500 transition duration-200"
        whileFocus={{ borderColor: '#3b82f6', boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)' }}
      >
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.span 
              key={tag + index} 
              className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              layout
            >
              {tag}
              <motion.button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                &times;
              </motion.button>
            </motion.span>
          ))}
        </AnimatePresence>
        
        <input
          type="text"
          id="tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length ? '' : "Add tags (press Enter, comma, or space to add)"}
          className="flex-grow bg-transparent focus:outline-none text-gray-700 dark:text-gray-300 min-w-[120px] p-1"
        />
      </motion.div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Press Enter, comma, or space to add a tag
      </p>
    </motion.div>
  );
} 