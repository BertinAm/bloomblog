"use client";

import React from 'react';
import Container from '../ui/Container';
import Heading from '../ui/Heading';

/**
 * Feature item component for individual features
 */
interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  delay?: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ 
  title, 
  description, 
  icon,
  accentColor,
  delay = 0 
}) => {
  const animationStyle = {
    animationDelay: `${delay}ms`,
  };

  return (
    <div 
      className="bg-background/20 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 animate-slide-up hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
      style={animationStyle}
    >
      <div className={`${accentColor} mb-6 text-4xl animate-float`}>{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
      <p className="text-primary/70">{description}</p>
    </div>
  );
};

/**
 * Features section showcasing platform capabilities
 */
const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background/90 to-background">
      <Container>
        <div className="text-center mb-16">
          <Heading level="h2" size="lg" className="mb-6 relative inline-block">
            <span className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-accent-rose/10 animate-pulse-glow blur-xl"></span>
            Why Choose BloomBlog?
            <span className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-accent-green/10 animate-pulse-glow blur-xl"></span>
          </Heading>
          <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto animate-fade-in">
            A modern blogging platform with everything you need to create and share your content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <FeatureItem
            icon={<span>✍️</span>}
            title="Easy Content Creation"
            description="Intuitive editor with rich formatting options to create beautiful blog posts with minimal effort."
            accentColor="text-accent-rose"
            delay={100}
          />
          <FeatureItem
            icon={<span>🎨</span>}
            title="Modern Design"
            description="Clean, responsive layouts that make your content shine on any device."
            accentColor="text-accent-orange"
            delay={200}
          />
          <FeatureItem
            icon={<span>🚀</span>}
            title="Lightning Fast"
            description="Optimized performance to ensure your blog loads quickly for all visitors."
            accentColor="text-accent-green"
            delay={300}
          />
        </div>
      </Container>
    </section>
  );
};

export default Features; 