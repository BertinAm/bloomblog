"use client";

import React from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button component with primary and secondary variants
 * 
 * @param variant - 'primary' (default) or 'secondary'
 * @param onClick - Click handler function
 * @param className - Additional classes to apply
 * @param type - HTML button type
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseClass = variant === 'primary' 
    ? 'bg-primary text-background hover:bg-opacity-90' 
    : 'border-2 border-primary text-primary hover:bg-primary hover:bg-opacity-10';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 ease-in-out font-body tracking-wide ${baseClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 