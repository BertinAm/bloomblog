'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogFooterProps {
  blog: {
    title: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
    };
    category: string;
    createdAt: string;
    readTime: number;
    tags: string[];
  };
}

export default function BlogFooter({ blog }: BlogFooterProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog.title;

  const shareOptions = [
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.018-2.005-1.222-2.005-1.222 0-1.409.953-1.409 1.939v5.67h-3v-11h3v1.617h.045c.446-.846 1.533-1.739 3.155-1.739 3.374 0 3.955 2.219 3.955 5.105v6.017z" />
        </svg>
      ),
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="max-w-3xl mx-auto mt-12 pt-8 border-t border-accent-rose/20"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{blog.author.name}</h3>
            <p className="text-sm text-foreground-secondary">{blog.author.bio}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-foreground-secondary">Share this article:</span>
          <div className="flex items-center space-x-2">
            {shareOptions.map((option) => (
              <Link
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-background-secondary transition-colors"
                aria-label={`Share on ${option.name}`}
              >
                {option.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {blog.tags.map((tag) => (
          <Link
            key={tag}
            href={`/explore?tag=${tag}`}
            className="px-3 py-1 bg-background-secondary text-foreground-secondary text-sm rounded-full border border-accent-rose/20 hover:bg-accent-rose/10 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </motion.div>
  );
} 