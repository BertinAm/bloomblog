import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import CallToAction from './CallToAction';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

/**
 * LandingPage component
 * Assembles all landing page sections into a complete page
 */
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-primary">
      <Navbar />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage; 