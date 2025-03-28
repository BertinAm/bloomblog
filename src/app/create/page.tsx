import BlogCreationForm from '@/components/blog/BlogCreationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Blog | BloomBlog',
  description: 'Create and publish your new blog post',
};

export default function CreateBlogPage() {
  return (
    <main className="py-24 min-h-screen">
      <BlogCreationForm />
    </main>
  );
} 