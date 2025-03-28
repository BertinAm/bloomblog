'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogHeaderProps {
  blog: {
    title: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
    };
    category: string;
    imageUrl: string;
    createdAt: string;
    readTime: number;
    tags: string[];
  };
}

export default function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <span className="px-3 py-1 bg-accent-rose text-white text-sm rounded-full mb-4 inline-block">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{blog.author.name}</span>
              </div>
              <span>•</span>
              <span>{blog.readTime} min read</span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-background-secondary text-foreground-secondary text-sm rounded-full border border-accent-rose/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4 text-foreground-secondary">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{blog.author.name}</h3>
            <p className="text-sm">{blog.author.bio}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 