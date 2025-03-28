'use client';

import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const DEFAULT_CATEGORIES = [
  { id: 'technology', name: 'Technology' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'health', name: 'Health & Wellness' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food & Cooking' },
  { id: 'finance', name: 'Finance' },
  { id: 'education', name: 'Education' },
  { id: 'other', name: 'Other' },
];

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [customCategories, setCustomCategories] = useState<{id: string; name: string}[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Combine default and custom categories
  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    
    if (selectedValue === 'add-new') {
      setIsAddingNew(true);
    } else {
      onChange(selectedValue);
    }
  };

  const handleNewCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      // Generate id from name (lowercase, hyphenated)
      const newCategoryId = newCategory.trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      // Add to custom categories
      const newCategoryItem = { id: newCategoryId, name: newCategory.trim() };
      setCustomCategories([...customCategories, newCategoryItem]);
      
      // Select the new category
      onChange(newCategoryId);
      
      // Reset the new category input
      setNewCategory('');
      setIsAddingNew(false);
      
      // Show success tooltip
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setNewCategory('');
  };

  return (
    <div className="space-y-2 relative">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Blog Category
      </label>
      
      {isAddingNew ? (
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <input
            type="text"
            value={newCategory}
            onChange={handleNewCategoryChange}
            placeholder="Enter new category"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            autoFocus
          />
          <motion.button
            type="button"
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
            className={`px-4 py-2 rounded-lg font-medium text-white ${
              !newCategory.trim() ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            whileHover={newCategory.trim() ? { scale: 1.05 } : {}}
            whileTap={newCategory.trim() ? { scale: 0.95 } : {}}
          >
            Add
          </motion.button>
          <motion.button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.div>
      ) : (
        <div className="relative">
          <select
            id="category"
            name="category"
            value={value}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none"
          >
            <option value="">Select a category</option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value="add-new">+ Add custom category</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      )}
      
      {showTooltip && (
        <motion.div 
          className="absolute right-0 -top-10 bg-green-600 text-white text-sm rounded-lg px-3 py-1 shadow-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          Category added!
        </motion.div>
      )}
    </div>
  );
} 