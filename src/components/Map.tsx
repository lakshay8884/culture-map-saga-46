
import React, { useState } from 'react';
import { culturalSites } from '@/data/culturalData';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Map: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const navigate = useNavigate();

  // This would be replaced with an actual map implementation like Leaflet or Google Maps
  // For now, we'll create a placeholder that shows the concept
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'monument':
        return 'bg-terracotta';
      case 'festival':
        return 'bg-gold';
      case 'art':
        return 'bg-emerald';
      case 'heritage':
        return 'bg-deepBlue';
      default:
        return 'bg-gray-500';
    }
  };

  const handleMarkerClick = (id: string) => {
    setSelectedSite(id);
  };

  const handleClosePopup = () => {
    setSelectedSite(null);
  };

  const handleExploreClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="relative map-container overflow-hidden">
      {/* Map Placeholder - This would be replaced with an actual map component */}
      <div className="w-full h-full bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative w-full h-full">
          {/* India Map Outline (simplified) */}
          <svg 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 text-deepBlue dark:text-gold opacity-20"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M30,20 C35,15 45,18 50,15 C55,12 60,5 70,10 C80,15 85,25 80,35 C75,45 78,55 75,65 C72,75 65,85 55,80 C45,75 35,78 25,75 C15,72 10,65 15,55 C20,45 25,25 30,20 Z" />
          </svg>

          {/* Map Markers */}
          {culturalSites.map((site) => (
            <button
              key={site.id}
              className={`absolute rounded-full p-1 ${getCategoryColor(site.category)} shadow-md transform transition-transform hover:scale-125 focus:outline-none z-10`}
              style={{
                left: `${(site.coordinates.lng - 70) * 8 + 50}%`,
                top: `${(site.coordinates.lat - 10) * 8 + 30}%`,
              }}
              onClick={() => handleMarkerClick(site.id)}
              aria-label={site.name}
            >
              <MapPin className="w-4 h-4 text-white" />
            </button>
          ))}

          {/* Info Popup */}
          {selectedSite && (
            <div 
              className="absolute z-20 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fade-in glass-card"
              style={{
                left: `${(culturalSites.find(s => s.id === selectedSite)?.coordinates.lng || 0 - 70) * 8 + 52}%`,
                top: `${(culturalSites.find(s => s.id === selectedSite)?.coordinates.lat || 0 - 10) * 8 + 20}%`,
              }}
            >
              {culturalSites.filter(s => s.id === selectedSite).map(site => (
                <div key={site.id}>
                  <div className="relative h-32">
                    <img src={site.imageUrl} alt={site.name} className="w-full h-full object-cover" />
                    <button 
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                      onClick={handleClosePopup}
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-serif font-semibold text-gray-900 dark:text-white">{site.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{site.location}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">{site.shortDescription}</p>
                    <button 
                      className="w-full py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors"
                      onClick={() => handleExploreClick(site.id)}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* In a real implementation, we would use a mapping library like Leaflet.js or Google Maps API */}
          {!selectedSite && (
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 dark:text-gray-500 pointer-events-none">
              <p className="mb-2 font-medium">Interactive Map Preview</p>
              <p className="text-sm">Click on markers to explore cultural sites</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
