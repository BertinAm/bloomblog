"use client";

import React from 'react';
import Container from '../ui/Container';

/**
 * Footer component with navigation links and copyright information
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 border-t border-primary/10 bg-background/90">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-4 sm:px-6">
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary mb-6 hover:text-accent-orange transition-colors duration-300">
              BloomBlog
            </h2>
            <p className="text-primary/70 max-w-sm mx-auto md:mx-0">
              A modern blogging platform for creators who want to share their stories with the world.
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-6">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary/70 hover:text-accent-rose transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-primary/70 hover:text-accent-orange transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-primary/70 hover:text-accent-green transition-colors duration-300">Pricing</a></li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-primary/70 hover:text-accent-rose transition-colors duration-300">About</a></li>
              <li><a href="#" className="text-primary/70 hover:text-accent-orange transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-primary/70 hover:text-accent-green transition-colors duration-300">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary/10 mt-12 pt-8 text-center text-primary/60">
          <p>&copy; {currentYear} BloomBlog. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 