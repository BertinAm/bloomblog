'use client';

import { motion } from 'framer-motion';

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-foreground-secondary prose-strong:text-foreground prose-code:text-accent-rose prose-pre:bg-background-secondary prose-pre:border prose-pre:border-accent-rose/20"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 