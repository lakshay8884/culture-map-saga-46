
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { regions } from '@/data/culturalData';
import RegionExplorer from '@/components/RegionExplorer';
import FestivalCalendar from '@/components/FestivalCalendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'react-router-dom';

const Regions: React.FC = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("explore");
  
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

  // Set initial region based on URL parameter, default to "north"
  const initialRegion = regionId || "north";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-deepBlue dark:text-white">
          Explore <span className="text-terracotta">India's Regions</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Discover the diverse cultural heritage across different regions of India
        </p>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList>
            <TabsTrigger value="explore">Explore States</TabsTrigger>
            <TabsTrigger value="festivals">Festival Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-8">
            <RegionExplorer />
          </TabsContent>
          
          <TabsContent value="festivals" className="space-y-8">
            <FestivalCalendar initialRegion={initialRegion} />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Astitva - The Cultural and Rituals Aspects of India. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Regions;
