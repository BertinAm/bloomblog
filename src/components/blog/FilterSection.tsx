'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FilterSectionProps {
  categories: string[];
  authors: string[];
  onFilterChange: (filters: {
    category?: string;
    author?: string;
    dateRange?: { start: string; end: string };
  }) => void;
}

export default function FilterSection({ categories, authors, onFilterChange }: FilterSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({
      category,
      author: selectedAuthor,
      dateRange,
    });
  };

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author);
    onFilterChange({
      category: selectedCategory,
      author,
      dateRange,
    });
  };

  const handleDateChange = (start: string, end: string) => {
    const newDateRange = { start, end };
    setDateRange(newDateRange);
    onFilterChange({
      category: selectedCategory,
      author: selectedAuthor,
      dateRange: newDateRange,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row gap-6 items-start md:items-center"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 w-full"
      >
        <h3 className="font-semibold text-lg mb-3">Categories</h3>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-background border border-primary/10 focus:outline-none focus:ring-2 focus:ring-accent-rose text-foreground"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 w-full"
      >
        <h3 className="font-semibold text-lg mb-3">Authors</h3>
        <select
          value={selectedAuthor}
          onChange={(e) => handleAuthorChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-background border border-primary/10 focus:outline-none focus:ring-2 focus:ring-accent-rose text-foreground"
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1 w-full"
      >
        <h3 className="font-semibold text-lg mb-3">Date Range</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateChange(e.target.value, dateRange.end)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-primary/10 focus:outline-none focus:ring-2 focus:ring-accent-rose"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateChange(dateRange.start, e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-primary/10 focus:outline-none focus:ring-2 focus:ring-accent-rose"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 