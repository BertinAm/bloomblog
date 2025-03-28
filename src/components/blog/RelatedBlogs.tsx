'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface RelatedBlogsProps {
  blogs: {
    id: string;
    title: string;
    author: string;
    category: string;
    excerpt: string;
    imageUrl: string;
    createdAt: string;
    readTime: number;
    tags: string[];
  }[];
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-background-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-accent-rose/20 group"
          >
            <Link href={`/blog/${blog.id}`}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent-rose text-white text-sm rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-foreground-secondary mb-4 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-foreground-secondary">
                  <span>{blog.author}</span>
                  <div className="flex items-center space-x-4">
                    <span>{blog.readTime} min read</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-background-secondary text-foreground-secondary text-sm rounded-full border border-accent-rose/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
} 