'use client';

import { useState, FormEvent, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from '../ui/Container';
import BlogTitleInput from './form/BlogTitleInput';
import AuthorSection from './form/AuthorSection';
import CategorySelect from './form/CategorySelect';
import TagsInput from './form/TagsInput';
import ImageUpload from './form/ImageUpload';
import RichTextEditor from './form/RichTextEditor';
import SubmitButton from './form/SubmitButton';
import Heading from '../ui/Heading';
import BlogSidebar from './BlogSidebar';
import Navbar from '../ui/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogFormData {
  id: string;
  title: string;
  author: {
    name: string;
    bio: string;
    imageUrl: string;
  };
  category: string;
  content: string;
  imageUrl: string | null;
  tags: string[];
  createdAt: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }
};

// Add styled background pattern component
const BackgroundPattern = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Top-right accent circle */}
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-rose/5 rounded-full blur-3xl" />
    
    {/* Bottom-left accent circle */}
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl" />
    
    {/* Decorative dots pattern */}
    <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-20">
      <div className="absolute w-2 h-2 bg-accent-rose rounded-full" style={{ top: '20%', left: '30%' }} />
      <div className="absolute w-2 h-2 bg-accent-green rounded-full" style={{ top: '40%', left: '60%' }} />
      <div className="absolute w-2 h-2 bg-accent-rose rounded-full" style={{ top: '60%', left: '20%' }} />
      <div className="absolute w-2 h-2 bg-accent-green rounded-full" style={{ top: '80%', left: '50%' }} />
    </div>
  </div>
);

export default function BlogCreationForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    id: uuidv4(),
    title: '',
    author: {
      name: '',
      bio: '',
      imageUrl: '',
    },
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
    setFormData(prev => {
      // Handle nested author object updates
      if (name.startsWith('author.')) {
        const field = name.split('.')[1];
        return {
          ...prev,
          author: {
            ...prev.author,
            [field]: value
          }
        };
      }
      return { ...prev, [name]: value };
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleAuthorImageChange = useCallback((file: File) => {
    // In a real app, you would upload this file to a storage service
    // For now, we'll create a temporary URL
    const imageUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      author: {
        ...prev.author,
        imageUrl
      }
    }));
  }, []);

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

    if (!formData.author.name.trim()) {
      newErrors['author.name'] = 'Author name is required';
    }

    if (!formData.author.bio.trim()) {
      newErrors['author.bio'] = 'Author bio is required';
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
          author: {
            name: '',
            bio: '',
            imageUrl: '',
          },
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
      <div className="relative min-h-screen bg-gradient-to-b from-background to-background-secondary">
        <BackgroundPattern />
        <Container className="pt-24 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-rose/10 rounded-full blur-2xl" />
            <Heading level="h1" size="2xl" className="text-center lg:text-left relative">
              Create a New Blog
            </Heading>
          </motion.div>

          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-start gap-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div 
              className="lg:w-2/3 w-full"
              variants={itemVariants}
            >              
              <AnimatePresence mode="wait">
                {isSuccess && (
                  <motion.div 
                    className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 p-4 rounded-lg mb-8 relative overflow-hidden"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-green/10 to-transparent" />
                    <p className="font-medium text-center relative z-10">Blog post saved successfully!</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div 
                variants={itemVariants}
                className="relative p-8 bg-white/50 dark:bg-gray-900/50 rounded-2xl backdrop-blur-sm border border-accent-rose/10"
              >
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-8 relative"
                >
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent-green/5 rounded-full blur-2xl" />
                  
                  <motion.div variants={itemVariants} className="relative z-10">
                    <BlogTitleInput 
                      value={formData.title}
                      onChange={(value: string) => handleInputChange('title', value)}
                      error={errors.title}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="relative z-10">
                    <AuthorSection
                      author={formData.author}
                      onChange={handleInputChange}
                      onImageChange={handleAuthorImageChange}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="relative z-10">
                    <CategorySelect 
                      value={formData.category}
                      onChange={(value: string) => handleInputChange('category', value)}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="relative z-10">
                    <RichTextEditor 
                      value={formData.content}
                      onChange={(value: string) => handleInputChange('content', value)}
                      error={errors.content}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="relative z-10">
                    <ImageUpload 
                      onImageUpload={handleImageUpload}
                      currentImage={formData.imageUrl}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="relative z-10">
                    <TagsInput 
                      tags={formData.tags}
                      onChange={handleTagsChange}
                    />
                  </motion.div>
                  
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative z-10"
                  >
                    <SubmitButton isSubmitting={isSubmitting} />
                  </motion.div>
                </motion.form>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/3 w-full"
              variants={itemVariants}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="lg:sticky lg:top-24 lg:w-full">
                <div className="relative p-6 bg-white/50 dark:bg-gray-900/50 rounded-2xl backdrop-blur-sm border border-accent-green/10">
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent-rose/5 rounded-full blur-2xl" />
                  <div className="relative z-10">
                    <BlogSidebar 
                      wordCount={wordCount} 
                      title={formData.title}
                      content={formData.content}
                      image={formData.imageUrl || undefined}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </>
  );
} 