import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden transform hover:-translate-y-1 hover:shadow-lg';
    
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 shadow-md hover:shadow-xl',
      secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg',
      outline: 'border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 focus:ring-blue-500 shadow-md hover:shadow-lg',
      ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:ring-gray-500',
    };

    const sizes = {
      sm: 'px-4 py-2.5 text-sm min-h-[40px]',
      md: 'px-6 py-3 text-base min-h-[48px]',
      lg: 'px-8 py-4 text-lg min-h-[56px]',
    };

    return (
      <motion.button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        whileHover={{ 
          scale: 1.02,
          boxShadow: variant === 'primary' ? '0 20px 25px -5px rgba(59, 130, 246, 0.4)' : undefined
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <motion.span
          className="relative z-10"
          initial={false}
          animate={{ scale: 1 }}
        >
          {children}
        </motion.span>
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0"
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
