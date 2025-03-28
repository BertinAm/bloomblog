"use client";

import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Container from '../ui/Container';

/**
 * Hero section for the landing page
 * Contains main headline, subheadline and call-to-action buttons
 */
const Hero: React.FC = () => {
  return (
    <section className="py-24 min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-background/95">
      <Container>
        <div className="max-w-3xl mx-auto text-center transform transition-all duration-500 hover:scale-[1.02]">
          <div className="relative">
            <div className="absolute -top-14 -left-14 w-28 h-28 rounded-full bg-accent-rose/20 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-accent-green/20 blur-xl animate-pulse"></div>
            
            <Heading 
              level="h1" 
              size="xl" 
              className="mb-10 text-primary animate-slide-down bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent-orange" 
              animate
            >
              Welcome to BloomBlog
            </Heading>
          </div>
          
          <p className="text-lg md:text-xl text-primary/70 mb-12 animate-slide-up max-w-2xl mx-auto leading-relaxed font-body">
            Share your thoughts, ideas, and stories with the world. 
            BloomBlog is a modern platform for expressing yourself through writing.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in">
            <Button 
              variant="primary"
              className="transform hover:translate-y-[-4px] hover:shadow-lg hover:shadow-accent-rose/20 transition-all duration-300"
            >
              View Blogs
            </Button>
            
            <Link href="/create">
              <Button 
                variant="secondary"
                className="transform hover:translate-y-[-4px] hover:shadow-lg hover:shadow-accent-green/20 transition-all duration-300"
              >
                Create Blog
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero; 