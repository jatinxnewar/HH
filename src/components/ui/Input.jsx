import React from "react";

const Input = ({ 
  className = "", 
  label,
  error,
  helperText,
  ...props 
}) => {
  const baseClasses = "w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input 
        className={`${baseClasses} ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
