'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogSidebarProps {
  wordCount: number;
  title: string;
  content: string;
  image?: string;
}

const WRITING_TIPS = [
  "Use clear and concise language to keep readers engaged.",
  "Start with a compelling headline that captures attention.",
  "Break content into smaller paragraphs for better readability.",
  "Include relevant images to enhance your blog's visual appeal.",
  "Use subheadings to organize your thoughts and improve structure.",
  "End with a strong call-to-action to engage your readers.",
  "Research your topic thoroughly before writing.",
  "Edit and proofread multiple times before publishing.",
  "Use storytelling techniques to connect with your audience.",
  "Include data and statistics to support your points."
];

const INSPIRATION_QUOTES = [
  "Either write something worth reading or do something worth writing. — Benjamin Franklin",
  "The first draft of anything is garbage. — Ernest Hemingway",
  "If you want to be a writer, you must do two things above all others: read a lot and write a lot. — Stephen King",
  "You can make anything by writing. — C.S. Lewis",
  "Start writing, no matter what. The water does not flow until the faucet is turned on. — Louis L'Amour",
  "You can't wait for inspiration. You have to go after it with a club. — Jack London",
  "Write hard and clear about what hurts. — Ernest Hemingway",
  "The scariest moment is always just before you start. — Stephen King"
];

export default function BlogSidebar({ wordCount, title, content, image }: BlogSidebarProps) {
  const [currentTip, setCurrentTip] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  
  // Rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % WRITING_TIPS.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Rotate quotes every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % INSPIRATION_QUOTES.length);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Estimate reading time (average reading speed: 200 words per minute)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Format content for preview by removing HTML tags
  const contentPreview = content
    ? content.replace(/<[^>]*>/g, ' ').substring(0, 150) + (content.length > 150 ? '...' : '')
    : 'Your blog content preview will appear here...';
  
  const hasTitle = title.trim().length > 0;
  const hasContent = content.trim().length > 0;
  const hasImage = image && image.length > 0;
  
  const blogProgress = () => {
    let score = 0;
    if (hasTitle) score += 20;
    if (hasImage) score += 20;
    if (hasContent) {
      if (wordCount < 100) score += 10;
      else if (wordCount < 300) score += 20;
      else if (wordCount < 600) score += 30;
      else score += 40;
    }
    return Math.min(100, score);
  };
  
  const progressPercent = blogProgress();
  
  const randomTip = WRITING_TIPS[Math.floor(Math.random() * WRITING_TIPS.length)];
  const randomQuote = INSPIRATION_QUOTES[Math.floor(Math.random() * INSPIRATION_QUOTES.length)];

  return (
    <div className="space-y-5 pb-4">
      <div className="bg-background-secondary p-5 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-3">Blog Progress</h3>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full mb-4">
          <motion.div 
            className="h-2.5 rounded-full bg-gradient-to-r from-accent-rose to-accent-orange"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-foreground-secondary">Title</p>
            <p className={hasTitle ? "font-medium" : "text-gray-400"}>
              {hasTitle ? "Complete" : "Missing"}
            </p>
          </div>
          <div>
            <p className="text-foreground-secondary">Featured Image</p>
            <p className={hasImage ? "font-medium" : "text-gray-400"}>
              {hasImage ? "Uploaded" : "Missing"}
            </p>
          </div>
          <div>
            <p className="text-foreground-secondary">Word Count</p>
            <p className={wordCount > 0 ? "font-medium" : "text-gray-400"}>
              {wordCount > 0 ? wordCount : "No content"}
            </p>
          </div>
          <div>
            <p className="text-foreground-secondary">Reading Time</p>
            <p className={content ? "font-medium" : "text-gray-400"}>
              {content ? `${readingTime} min${readingTime !== 1 ? 's' : ''}` : "N/A"}
            </p>
          </div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key="writing-tip"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-background-secondary p-5 rounded-lg shadow-sm"
        >
          <h3 className="font-semibold text-lg mb-3">Writing Tip</h3>
          <p className="text-foreground-secondary italic">{randomTip}</p>
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key="inspiration"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-background-secondary p-5 rounded-lg shadow-sm min-h-[80px]"
        >
          <h3 className="font-semibold text-lg mb-3">Inspiration</h3>
          <blockquote className="text-foreground-secondary italic">
            "{randomQuote}"
          </blockquote>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 