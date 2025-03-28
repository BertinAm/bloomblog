'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function BackToBlogs() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-16"
    >
      <Link
        href="/explore"
        className="inline-flex items-center text-accent-rose hover:text-accent-rose/80 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to All Blogs
      </Link>
    </motion.div>
  );
} 