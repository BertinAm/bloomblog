"use client";

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container component for consistent layout spacing
 * Uses max width and horizontal padding for responsive layout
 * 
 * @param children - Content to be contained
 * @param className - Additional classes to apply
 */
export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
} 