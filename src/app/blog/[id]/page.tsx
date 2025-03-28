'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Navbar from '@/components/ui/Navbar';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogContent from '@/components/blog/BlogContent';
import BlogFooter from '@/components/blog/BlogFooter';
import RelatedBlogs from '@/components/blog/RelatedBlogs';
import BackToBlogs from '@/components/blog/BackToBlogs';

// Mock data for demonstration
const mockBlog = {
  id: '1',
  title: 'Getting Started with Next.js',
  author: {
    name: 'John Doe',
    avatar: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg',
    bio: 'Senior Full Stack Developer with 5 years of experience in web development.',
  },
  category: 'Technology',
  excerpt: 'Learn the basics of Next.js and how to create your first application with this powerful React framework.',
  imageUrl: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg',
  createdAt: '2024-03-15',
  readTime: 5,
  tags: ['Next.js', 'React', 'Web Development'],
  content: `
    <h2>Introduction to Next.js</h2>
    <p>Next.js is a powerful React framework that makes it easy to build fast, modern websites. In this comprehensive guide, we'll explore the key features and benefits of using Next.js for your next project.</p>
    
    <h2>Why Choose Next.js?</h2>
    <p>Next.js offers several advantages over traditional React applications:</p>
    <ul>
      <li>Server-side rendering for better performance and SEO</li>
      <li>Static site generation for blazing-fast page loads</li>
      <li>API routes for building backend functionality</li>
      <li>Built-in CSS and Sass support</li>
      <li>Automatic code splitting</li>
    </ul>

    <h2>Getting Started</h2>
    <p>To create a new Next.js project, you can use the following command:</p>
    <pre><code>npx create-next-app@latest my-next-app</code></pre>
    
    <h2>Project Structure</h2>
    <p>Next.js follows a file-system based routing approach. Here's a typical project structure:</p>
    <pre><code>
    my-next-app/
    ├── pages/
    │   ├── index.js
    │   ├── about.js
    │   └── blog/
    │       └── [id].js
    ├── public/
    ├── styles/
    └── components/
    </code></pre>

    <h2>Conclusion</h2>
    <p>Next.js is an excellent choice for building modern web applications. Its features and developer experience make it a joy to work with.</p>
  `,
};

// Mock related blogs data
const relatedBlogs = [
  {
    id: '2',
    title: 'The Future of Web Development: Trends to Watch in 2024',
    author: 'Sarah Chen',
    category: 'Technology',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to advanced frameworks.',
    imageUrl: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-02-15',
    readTime: 8,
    tags: ['Web Development', 'Technology', 'Future Trends'],
  },
  {
    id: '3',
    title: 'Building Scalable Applications with Modern Architecture',
    author: 'Michael Rodriguez',
    category: 'Development',
    excerpt: 'Learn about modern architectural patterns and best practices for building scalable applications.',
    imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    createdAt: '2024-02-10',
    readTime: 10,
    tags: ['Architecture', 'Scalability', 'Best Practices'],
  },
];

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8"
        >
          <BackToBlogs />
          <BlogHeader blog={mockBlog} />
          <BlogContent content={mockBlog.content} />
          <BlogFooter blog={mockBlog} />
          <RelatedBlogs blogs={relatedBlogs} />
        </motion.div>
      </Container>
    </div>
  );
} 