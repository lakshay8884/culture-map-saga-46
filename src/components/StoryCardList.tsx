
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StoryCard from './StoryCard';
import { culturalSites } from '@/data/culturalData';

const StoryCardList: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const featuredSites = culturalSites.filter(site => site.isFeatured);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-6">
      <h2 className="section-title">
        Explore Featured Destinations
      </h2>
      
      {/* Scroll buttons */}
      <div className="absolute right-0 top-6 flex space-x-2">
        <button 
          onClick={() => scroll('left')}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Card container */}
      <div 
        ref={scrollRef}
        className="scroll-container py-4"
      >
        {featuredSites.map(site => (
          <StoryCard key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
};

export default StoryCardList;
