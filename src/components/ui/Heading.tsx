"use client";

import React from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xl' | '2xl' | 'lg' | 'md' | 'sm';

interface HeadingProps {
  as?: HeadingLevel;
  level?: HeadingLevel; // Keep for backward compatibility
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

/**
 * Reusable Heading component with different size variants
 * 
 * @param as - HTML heading level (h1-h6)
 * @param level - (deprecated) use 'as' instead
 * @param size - Size variant (2xl, xl, lg, md, sm)
 * @param className - Additional classes
 * @param animate - Whether to apply animation
 */
const Heading: React.FC<HeadingProps> = ({
  as,
  level,
  size = 'lg',
  children,
  className = '',
  animate = false,
}) => {
  // Use 'as' prop if provided, fall back to 'level' for backward compatibility
  const headingLevel = as || level || 'h1';
  
  const sizeClasses = {
    '2xl': 'text-5xl font-bold lg:text-7xl font-heading tracking-tight',
    xl: 'text-4xl font-bold lg:text-6xl font-heading tracking-tight',
    lg: 'text-3xl font-bold font-heading tracking-tight',
    md: 'text-2xl font-semibold font-heading tracking-tight',
    sm: 'text-xl font-semibold font-heading tracking-tight',
  };
  
  const animationClass = animate ? 'animate-slide-down' : '';
  const combinedClasses = `${sizeClasses[size]} ${animationClass} ${className}`;
  
  switch (headingLevel) {
    case 'h1':
      return <h1 className={combinedClasses}>{children}</h1>;
    case 'h2':
      return <h2 className={combinedClasses}>{children}</h2>;
    case 'h3':
      return <h3 className={combinedClasses}>{children}</h3>;
    case 'h4':
      return <h4 className={combinedClasses}>{children}</h4>;
    case 'h5':
      return <h5 className={combinedClasses}>{children}</h5>;
    case 'h6':
      return <h6 className={combinedClasses}>{children}</h6>;
    default:
      return <h1 className={combinedClasses}>{children}</h1>;
  }
};

export default Heading; 