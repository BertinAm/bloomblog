'use client';

import { useState, FormEvent, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from '../ui/Container';
import BlogTitleInput from './form/BlogTitleInput';
import AuthorInput from './form/AuthorInput';
import CategorySelect from './form/CategorySelect';
import TagsInput from './form/TagsInput';
import ImageUpload from './form/ImageUpload';
import RichTextEditor from './form/RichTextEditor';
import SubmitButton from './form/SubmitButton';
import Heading from '../ui/Heading';
import BlogSidebar from './BlogSidebar';
import Navbar from '../ui/Navbar';
import { motion } from 'framer-motion';

interface BlogFormData {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  imageUrl: string | null;
  tags: string[];
  createdAt: string;
}

export default function BlogCreationForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    id: uuidv4(),
    title: '',
    author: '',
    category: '',
    content: '',
    imageUrl: null,
    tags: [],
    createdAt: new Date().toISOString(),
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    // Calculate word count from content
    if (formData.content) {
      const words = formData.content.trim().split(/\s+/);
      setWordCount(formData.content.trim() ? words.length : 0);
    } else {
      setWordCount(0);
    }
  }, [formData.content]);

  // Input change handlers
  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleTagsChange = useCallback((tags: string[]) => {
    setFormData(prev => ({ ...prev, tags }));
  }, []);

  const handleImageUpload = useCallback((imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, imageUrl }));
  }, []);

  // Form validation
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Blog title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Blog content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Form submission
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Save to local storage
      const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
      const updatedBlogs = [...existingBlogs, formData];
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      
      setIsSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          id: uuidv4(),
          title: '',
          author: '',
          category: '',
          content: '',
          imageUrl: null,
          tags: [],
          createdAt: new Date().toISOString(),
        });
        setWordCount(0);
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <>
      <Navbar />
      <Container className="pt-24">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="lg:w-2/3 w-full">
            <Heading level="h1" size="2xl" className="mb-8 text-center lg:text-left animate-fade-up">
              Create a New Blog
            </Heading>
            
            {isSuccess ? (
              <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 p-4 rounded-lg mb-8 animate-fade">
                <p className="font-medium text-center">Blog post saved successfully!</p>
              </div>
            ) : null}
            
            <div className="animate-slide-in-left">
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <BlogTitleInput 
                  value={formData.title}
                  onChange={(value: string) => handleInputChange('title', value)}
                  error={errors.title}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AuthorInput 
                    value={formData.author}
                    onChange={(value: string) => handleInputChange('author', value)}
                  />
                  
                  <CategorySelect 
                    value={formData.category}
                    onChange={(value: string) => handleInputChange('category', value)}
                  />
                </div>
                
                <RichTextEditor 
                  value={formData.content}
                  onChange={(value: string) => handleInputChange('content', value)}
                  error={errors.content}
                />
                
                <ImageUpload 
                  onImageUpload={handleImageUpload}
                  currentImage={formData.imageUrl}
                />
                
                <TagsInput 
                  tags={formData.tags}
                  onChange={handleTagsChange}
                />
                
                <SubmitButton isSubmitting={isSubmitting} />
              </motion.form>
            </div>
          </div>
          
          <div className="lg:w-1/3 w-full mt-4 lg:mt-0 animate-slide-in-right">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2 pb-8 lg:pl-4">
              <BlogSidebar 
                wordCount={wordCount} 
                title={formData.title}
                content={formData.content}
                image={formData.imageUrl || undefined}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
} 