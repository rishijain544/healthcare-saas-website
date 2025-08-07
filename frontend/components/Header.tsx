import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Button from './ui/Button';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.features'), path: '/features' },
    { name: t('nav.pricing'), path: '/pricing' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const handleDashboardClick = () => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HealthAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDashboardClick}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <User size={16} />
                  <span className="text-sm">{user.name}</span>
                </button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <nav className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        handleDashboardClick();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {t('nav.dashboard')} - {user.name}
                    </button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      {t('nav.logout')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="primary" size="sm" className="w-full">
                        {t('nav.signup')}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
