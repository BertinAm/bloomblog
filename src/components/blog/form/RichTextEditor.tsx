'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync the external value with the editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
    editorRef.current?.focus();
  };

  const handleCreateLink = () => {
    const url = prompt('Enter link URL');
    if (url) {
      handleFormat('createLink', url);
    }
  };

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Blog Content <span className="text-red-500">*</span>
      </label>
      
      <div className={`border rounded-lg overflow-hidden ${
        error ? 'border-red-500' : isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-700'
      }`}>
        <motion.div 
          className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Text formatting controls */}
          <motion.button
            type="button"
            onClick={() => handleFormat('bold')}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Bold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => handleFormat('italic')}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Italic"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => handleFormat('underline')}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Underline"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.button>
          
          <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6 self-center"></div>
          
          <motion.button
            type="button"
            onClick={() => handleFormat('insertOrderedList')}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Ordered List"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          
          <motion.button
            type="button"
            onClick={() => handleFormat('insertUnorderedList')}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Bullet List"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
          
          <div className="border-r border-gray-300 dark:border-gray-600 mx-1 h-6 self-center"></div>
          
          <motion.button
            type="button"
            onClick={handleCreateLink}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Insert Link"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.102 1.101" />
            </svg>
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            ref={editorRef}
            contentEditable={true}
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="min-h-[240px] p-4 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            data-placeholder="Start writing your blog content..."
          />
        </motion.div>
      </div>
      
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