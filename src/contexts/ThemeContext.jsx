import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      // Set CSS custom properties for dark mode
      document.documentElement.style.setProperty('--color-background', '#0f172a');
      document.documentElement.style.setProperty('--color-foreground', '#f8fafc');
      document.documentElement.style.setProperty('--color-card', '#1e293b');
      document.documentElement.style.setProperty('--color-border', '#334155');
      document.documentElement.style.setProperty('--color-muted', '#1e293b');
      document.documentElement.style.setProperty('--color-muted-foreground', '#94a3b8');
      document.documentElement.style.setProperty('--color-primary', '#60a5fa');
      document.documentElement.style.setProperty('--color-primary-foreground', '#0f172a');
      document.documentElement.style.setProperty('--color-destructive', '#f87171');
      document.documentElement.style.setProperty('--color-destructive-foreground', '#0f172a');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      // Set CSS custom properties for light mode
      document.documentElement.style.setProperty('--color-background', '#ffffff');
      document.documentElement.style.setProperty('--color-foreground', '#0f172a');
      document.documentElement.style.setProperty('--color-card', '#ffffff');
      document.documentElement.style.setProperty('--color-border', '#e2e8f0');
      document.documentElement.style.setProperty('--color-muted', '#f8fafc');
      document.documentElement.style.setProperty('--color-muted-foreground', '#64748b');
      document.documentElement.style.setProperty('--color-primary', '#3b82f6');
      document.documentElement.style.setProperty('--color-primary-foreground', '#ffffff');
      document.documentElement.style.setProperty('--color-destructive', '#ef4444');
      document.documentElement.style.setProperty('--color-destructive-foreground', '#ffffff');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};