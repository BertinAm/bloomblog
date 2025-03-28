"use client";

import React from 'react';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Button from '../ui/Button';

/**
 * Call to Action section with prominent button
 * Designed to encourage users to take action
 */
const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-accent-rose/20 via-background to-accent-green/20">
      <Container>
        <div className="bg-background/30 backdrop-blur-md border border-primary/10 rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto transform hover:scale-[1.01] transition-all duration-500 shadow-xl hover:shadow-2xl">
          <Heading level="h2" size="lg" className="mb-4 text-primary animate-slide-down">
            Ready to Start Your Blogging Journey?
          </Heading>
          
          <p className="text-lg md:text-xl text-primary/70 mb-10 max-w-2xl mx-auto animate-slide-up">
            Join thousands of content creators who are sharing their stories, building their audience, 
            and connecting with readers from around the world.
          </p>
          
          <Button 
            variant="primary" 
            className="px-8 py-4 text-lg shadow-lg hover:shadow-accent-orange/30 transform hover:translate-y-[-4px] transition-all duration-300 animate-bounce-subtle bg-gradient-to-r from-accent-rose to-accent-orange hover:from-accent-orange hover:to-accent-rose text-white font-bold"
          >
            Create Your First Blog Post
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction; 