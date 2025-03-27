
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import Map from '@/components/Map';
import StoryCardList from '@/components/StoryCardList';
import VirtualTour from '@/components/VirtualTour';
import RegionExplorer from '@/components/RegionExplorer';

const Index: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for user's preferred color scheme on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Listen for changes in user's preferred color scheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 pt-6 pb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-deepBlue dark:text-white">
          <span className="text-terracotta">Astitva</span> - <span className="text-gradient">The Cultural and Rituals Aspects of India</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
          Explore monuments, festivals, traditional arts, and historic sites through an interactive journey
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 lg:flex-shrink-0 order-2 lg:order-1">
            <SideBar />
          </aside>
          
          {/* Main content */}
          <div className="flex-1 order-1 lg:order-2">
            <section className="mb-12">
              <h2 className="section-title">Interactive Map</h2>
              <Map />
            </section>
            
            <section className="mb-12">
              <StoryCardList />
            </section>
            
            <section className="mb-12">
              <h2 className="section-title">Explore Regions of India</h2>
              <RegionExplorer />
            </section>
            
            <section className="mb-8">
              <h2 className="section-title">Virtual Tour Experience</h2>
              <VirtualTour />
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                Experience immersive 360° views of India's most iconic cultural landmarks
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Astitva - The Cultural and Rituals Aspects of India. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
