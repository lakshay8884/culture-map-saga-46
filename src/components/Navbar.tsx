
import React, { useState } from 'react';
import { Menu, X, Filter, Sun, Moon, User, PenLine } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleTheme,
  isDarkMode
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categories = [{
    id: 'monument',
    name: 'Monuments'
  }, {
    id: 'festival',
    name: 'Festivals'
  }, {
    id: 'art',
    name: 'Arts'
  }, {
    id: 'heritage',
    name: 'Heritage Sites'
  }];
  
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/b9d75b12-2717-4972-a219-18db3dd5ea19.png" alt="Astitva Logo" className="h-12 w-auto object-cover" />
            <div className="hidden md:block">
              <span className="text-xl font-serif font-bold">
                <span className="text-terracotta">Astitva</span>
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-400 italic">The Cultural and Rituals Aspects of India</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-terracotta' : 'text-gray-700 dark:text-gray-200 hover:text-terracotta dark:hover:text-terracotta'}`}>
              Home
            </Link>
            <Link to="/regions" className={`text-sm font-medium transition-colors ${location.pathname.includes('/region') ? 'text-terracotta' : 'text-gray-700 dark:text-gray-200 hover:text-terracotta dark:hover:text-terracotta'}`}>
              Regions
            </Link>
            <Link to="/top-rated" className={`text-sm font-medium transition-colors ${location.pathname === '/top-rated' ? 'text-terracotta' : 'text-gray-700 dark:text-gray-200 hover:text-terracotta dark:hover:text-terracotta'}`}>
              Top Rated
            </Link>
            <Link to="/contribute" className={`text-sm font-medium transition-colors flex items-center ${location.pathname === '/contribute' ? 'text-terracotta' : 'text-gray-700 dark:text-gray-200 hover:text-terracotta dark:hover:text-terracotta'}`}>
              <PenLine className="w-4 h-4 mr-1" /> Contribute
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {/* Filter Button */}
            <div className="relative">
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Filter">
                <Filter className="w-5 h-5" />
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 animate-fade-in glass-card">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">Categories</div>
                    {categories.map(category => (
                      <Link 
                        key={category.id} 
                        to={`/category/${category.id}`} 
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700" 
                        onClick={() => setIsFilterOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Profile */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 animate-fade-in">
            <div className="mb-2 flex items-center">
              <img src="/lovable-uploads/b9d75b12-2717-4972-a219-18db3dd5ea19.png" alt="Astitva Logo" className="h-8 w-auto mr-2" />
              <div>
                <span className="text-lg font-serif font-bold">
                  <span className="text-terracotta">Astitva</span>
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 italic">The Cultural and Rituals Aspects of India</p>
              </div>
            </div>
            <SearchBar className="mb-4" />
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg ${location.pathname === '/' ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/regions" 
                className={`px-4 py-2 rounded-lg ${location.pathname.includes('/region') ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Regions
              </Link>
              <Link 
                to="/top-rated" 
                className={`px-4 py-2 rounded-lg ${location.pathname === '/top-rated' ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Top Rated
              </Link>
              <Link 
                to="/contribute" 
                className={`px-4 py-2 rounded-lg flex items-center ${location.pathname === '/contribute' ? 'bg-terracotta/10 text-terracotta' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <PenLine className="w-4 h-4 mr-2" /> Contribute
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
