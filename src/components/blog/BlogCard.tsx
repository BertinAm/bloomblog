'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogCardProps {
  id: string;
  title: string;
  author: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  createdAt: string;
  readTime: number;
  tags: string[];
}

export default function BlogCard({
  id,
  title,
  author,
  category,
  excerpt,
  imageUrl,
  createdAt,
  readTime,
  tags,
}: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="relative bg-background-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-accent-rose/20 group"
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'linear-gradient(45deg, #f43f5e, #8b5cf6, #3b82f6, #10b981)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          opacity: 0.1,
          zIndex: -1,
        }}
      />
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-accent-rose text-white text-sm rounded-full">
            {category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        <p className="text-foreground-secondary mb-4 line-clamp-3">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-foreground-secondary mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{author}</span>
            <span className="text-accent-rose">•</span>
            <span>{readTime} min read</span>
          </div>
          <span className="text-accent-rose">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-background-secondary text-foreground-secondary text-sm rounded-full border border-accent-rose/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center space-x-2 text-accent-rose font-medium group"
          >
            <span>Read More</span>
            <svg
              className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </Link>
      </div>
    </motion.article>
  );
} 