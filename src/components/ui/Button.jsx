import React from 'react';
import Icon from '../AppIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  iconName,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-blue-500 shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-gray-500 border border-gray-300 dark:border-gray-600',
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500 hover:border-blue-300',
    ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500',
    destructive: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-red-500 shadow-sm hover:shadow-md',
    success: 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:ring-green-500 shadow-sm hover:shadow-md',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:ring-yellow-500 shadow-sm hover:shadow-md'
  };
  
  const sizes = {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
    icon: 'h-10 w-10'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
      )}
      
      {iconName && iconPosition === 'left' && !loading && (
        <Icon name={iconName} size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 18 : size === 'xl' ? 20 : 16} className="mr-2" />
      )}
      
      {children}
      
      {iconName && iconPosition === 'right' && !loading && (
        <Icon name={iconName} size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 18 : size === 'xl' ? 20 : 16} className="ml-2" />
      )}
    </button>
  );
};

export default Button;
