"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '../ui/Container';
import ThemeToggle from '../ui/ThemeToggle';

/**
 * Responsive navigation bar component
 * Includes logo, navigation links, and mobile menu
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll event listener to detect when to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary ml-2 sm:ml-4 hover:text-accent-orange transition-colors duration-300">
              BloomBlog
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#" className="text-primary/80 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#" className="text-primary/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#" className="text-primary/80 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link 
              href="/create" 
              className="px-4 py-2 rounded-md bg-gradient-to-r from-accent-rose to-accent-orange text-primary transition-all hover:from-accent-orange hover:to-accent-rose hover:scale-105 hover:shadow-lg hover:shadow-accent-orange/30"
            >
              Create Blog
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu and Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-primary focus:outline-none mr-2 sm:mr-4"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-primary/80 hover:text-primary transition-colors py-2">
                Home
              </Link>
              <Link href="#" className="text-primary/80 hover:text-primary transition-colors py-2">
                Features
              </Link>
              <Link href="#" className="text-primary/80 hover:text-primary transition-colors py-2">
                About
              </Link>
              <Link href="#" className="text-primary/80 hover:text-primary transition-colors py-2">
                Contact
              </Link>
              <Link 
                href="/create" 
                className="text-primary/80 hover:text-primary transition-colors py-2 font-semibold text-accent-orange"
              >
                Create Blog
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar; 