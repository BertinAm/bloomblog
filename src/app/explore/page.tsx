'use client';

import { useState, useCallback } from 'react';
import Container from '@/components/ui/Container';
import Navbar from '@/components/ui/Navbar';
import BlogCard from '@/components/blog/BlogCard';
import FilterSection from '@/components/blog/FilterSection';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from '@/components/ui/Heading';

// Mock data for demonstration
const mockBlogs = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    author: 'John Doe',
    category: 'Technology',
    excerpt: 'Learn the basics of Next.js and how to create your first application with this powerful React framework.',
    imageUrl: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-03-15',
    readTime: 5,
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    id: '2',
    title: 'Healthy Living: A Complete Guide',
    author: 'Jane Smith',
    category: 'Health',
    excerpt: 'Discover the essential habits and practices for maintaining a healthy lifestyle in today\'s fast-paced world.',
    imageUrl: 'https://images.pexels.com/photos/4052198/pexels-photo-4052198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-03-14',
    readTime: 8,
    tags: ['Health', 'Lifestyle', 'Wellness'],
  },
  {
    id: '3',
    title: 'Exploring Hidden Gems in Europe',
    author: 'Mike Johnson',
    category: 'Travel',
    excerpt: 'Take a journey through Europe\'s lesser-known destinations and discover the charm of off-the-beaten-path locations.',
    imageUrl: 'https://images.pexels.com/photos/20046363/pexels-photo-20046363/free-photo-of-pictures-of-valentines-day-on-laptop-screen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-03-13',
    readTime: 10,
    tags: ['Travel', 'Europe', 'Adventure'],
  },
  {
    id: '4',
    title: 'The Art of Food Photography',
    author: 'Sarah Williams',
    category: 'Food',
    excerpt: 'Master the techniques of food photography and learn how to capture stunning images that make your dishes look irresistible.',
    imageUrl: 'https://images.pexels.com/photos/6869016/pexels-photo-6869016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-03-12',
    readTime: 6,
    tags: ['Photography', 'Food', 'Art'],
  },
  {
    id: '5',
    title: 'Minimalist Living: Less is More',
    author: 'John Doe',
    category: 'Lifestyle',
    excerpt: 'Explore the benefits of minimalist living and learn how to declutter your life for greater happiness and productivity.',
    imageUrl: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-03-11',
    readTime: 7,
    tags: ['Lifestyle', 'Minimalism', 'Productivity'],
  },
  {
    id: '6',
    title: 'The Future of Artificial Intelligence',
    author: 'Jane Smith',
    category: 'Technology',
    excerpt: 'Dive into the latest developments in AI and explore how this transformative technology is shaping our future.',
    imageUrl: 'https://images.pexels.com/photos/4052198/pexels-photo-4052198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-03-10',
    readTime: 9,
    tags: ['AI', 'Technology', 'Future'],
  },
];

const categories = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health'];
const authors = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams'];

export default function ExplorePage() {
  const [filteredBlogs, setFilteredBlogs] = useState(mockBlogs);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = useCallback(
    (filters: {
      category?: string;
      author?: string;
      dateRange?: { start: string; end: string };
    }) => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        let filtered = [...mockBlogs];

        if (filters.category) {
          filtered = filtered.filter((blog) => blog.category === filters.category);
        }

        if (filters.author) {
          filtered = filtered.filter((blog) => blog.author === filters.author);
        }

        if (filters.dateRange?.start && filters.dateRange?.end) {
          filtered = filtered.filter((blog) => {
            const blogDate = new Date(blog.createdAt);
            const startDate = new Date(filters.dateRange!.start);
            const endDate = new Date(filters.dateRange!.end);
            return blogDate >= startDate && blogDate <= endDate;
          });
        }

        setFilteredBlogs(filtered);
        setIsLoading(false);
      }, 500);
    },
    []
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container>
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold mb-6"
            >
              Explore Stories
            </motion.h1>
            <div className="bg-background-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-accent-rose/20">
              <FilterSection
                categories={Array.from(new Set(mockBlogs.map((blog) => blog.category)))}
                authors={Array.from(new Set(mockBlogs.map((blog) => blog.author)))}
                onFilterChange={handleFilterChange}
              />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center min-h-[400px]"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-rose"></div>
              </motion.div>
            ) : filteredBlogs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <p className="text-foreground-secondary text-lg">
                  No stories found matching your filters.
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredBlogs.map((blog) => (
                  <motion.div key={blog.id} variants={item}>
                    <BlogCard {...blog} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
} 