
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContributeForm from '@/components/ContributeForm';

const Contribute: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-deepBlue dark:text-white">
            <span className="text-terracotta">Contribute</span> to Astitva
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Help us document and preserve India's rich cultural heritage by sharing your local knowledge
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-serif font-semibold text-deepBlue dark:text-gold mb-4">
              Why Your Contributions Matter
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              India's cultural heritage is vast and diverse, with many local traditions, monuments, and festivals 
              that remain undocumented or under-represented. By contributing to Astitva, you help:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
              <li>Preserve cultural knowledge for future generations</li>
              <li>Increase awareness of lesser-known cultural treasures</li>
              <li>Create a comprehensive resource for cultural education</li>
              <li>Connect people with their cultural roots and heritage</li>
              <li>Promote cultural tourism to benefit local communities</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              Every contribution, big or small, helps build a more complete picture of India's cultural landscape.
            </p>
          </div>
          
          <ContributeForm />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-serif font-semibold text-deepBlue dark:text-gold mb-4">
              Contribution Guidelines
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Provide accurate information based on reliable sources or personal knowledge</li>
              <li>Include high-quality, original images whenever possible</li>
              <li>Focus on cultural, historical, and educational aspects rather than commercial elements</li>
              <li>Respect the cultural and religious significance of the subject matter</li>
              <li>All submissions are reviewed by our team before being published</li>
            </ul>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Astitva - The Cultural and Rituals Aspects of India. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contribute;
