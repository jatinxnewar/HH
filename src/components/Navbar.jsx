import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Icon from './AppIcon';
import HelpHiveLogo from './HelpHiveLogo';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [userRole, setUserRole] = useState('seeker'); // seeker or helper

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/',
      icon: 'Home',
      active: location.pathname === '/'
    },
    {
      name: 'Post Task',
      href: '/task-posting-dashboard',
      icon: 'Plus',
      active: location.pathname === '/task-posting-dashboard',
      primary: true
    },
    {
      name: 'My Tasks',
      href: '/task-management-hub',
      icon: 'CheckSquare',
      active: location.pathname === '/task-management-hub'
    },
    {
      name: 'Find Helpers',
      href: '/helper-search',
      icon: 'Search',
      active: location.pathname === '/helper-search'
    },
    {
      name: 'Profile',
      href: '/helper-profile-details',
      icon: 'User',
      active: location.pathname === '/helper-profile-details'
    }
  ];

  const quickActions = [
    {
      name: 'Emergency SOS',
      action: () => navigate('/emergency-sos-center'),
      icon: 'AlertTriangle',
      variant: 'danger'
    }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-slate-700' 
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <HelpHiveLogo size={40} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">HelpHive</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Community Support</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active
                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow-sm'
                        : item.primary
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
              </button>

              {isAuthenticated ? (
                <>
                  {/* Quick Actions for authenticated users */}
                  <div className="hidden md:flex items-center space-x-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.name}
                        onClick={action.action}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          action.variant === 'danger'
                            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                        title={action.name}
                      >
                        <Icon name={action.icon} size={14} />
                        <span className="hidden lg:inline">{action.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Notifications */}
                  <button
                    className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
                    onClick={() => navigate('/notifications')}
                  >
                    <Icon name="Bell" size={20} />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {notifications}
                      </span>
                    )}
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-slate-600 dark:to-slate-700 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <Icon name="ChevronDown" size={16} />
                </button>

                {/* User Dropdown */}
                {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-600 py-2 animate-fadeIn">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-600">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                      <Link
                        to="/helper-profile-details"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon name="User" size={12} color="#3B82F6" />
                        </div>
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/task-management-hub"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon name="CheckSquare" size={12} color="#10B981" />
                        </div>
                        <span>My Bookings</span>
                      </Link>
                      <div className="border-t border-gray-100 dark:border-slate-600 mt-2 pt-2">
                        <button
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left rounded-md transition-colors"
                          onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                            navigate('/');
                          }}
                        >
                          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                            <Icon name="LogOut" size={12} color="#EF4444" />
                          </div>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                )}
              </div>

                  {/* Mobile menu button */}
                  <button
                    className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                  {/* Mobile menu button for non-authenticated */}
                  <button
                    className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 animate-slideIn">
            <div className="px-4 py-4 space-y-2">
              {isAuthenticated ? (
                navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active
                        ? 'bg-blue-50 text-blue-600'
                        : item.primary
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-3 rounded-lg text-sm font-medium bg-blue-600 text-white transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
              
              {/* Mobile Quick Actions */}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-600 space-y-2">
                {/* Theme Toggle for Mobile */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                >
                  <Icon name={isDarkMode ? "Sun" : "Moon"} size={18} />
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                
                {isAuthenticated && quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={() => {
                      action.action();
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
                      action.variant === 'danger'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Icon name={action.icon} size={18} />
                    <span>{action.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
