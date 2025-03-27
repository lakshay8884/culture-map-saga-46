
import React, { useState } from 'react';
import { culturalSites } from '@/data/culturalData';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Map: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const navigate = useNavigate();

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
    <div className="relative map-container overflow-hidden rounded-lg">
      <div className="w-full h-full" id="map">
        {/* Static map image of India */}
        <div className="relative w-full" style={{ height: "400px" }}>
          <img 
            src="https://i.imgur.com/0SjRVbE.jpg" 
            alt="Map of India showing cultural sites" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = "https://i.imgur.com/HbM2ZPV.jpg"; // Fallback image
            }}
          />
          
          {/* Static marker dots for cultural sites */}
          {culturalSites.map(site => (
            <button
              key={site.id}
              className="absolute w-4 h-4 rounded-full bg-terracotta hover:bg-terracotta/80 transition-colors cursor-pointer shadow-md"
              style={{
                left: `${(site.coordinates.lng - 65) * 6 + 50}%`,
                top: `${(site.coordinates.lat - 5) * 6 + 20}%`,
              }}
              onClick={() => handleMarkerClick(site.id)}
              aria-label={site.name}
            />
          ))}
        </div>
      </div>
      
      {selectedSite && (
        <div 
          className="absolute z-20 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fade-in glass-card pointer-events-auto"
          style={{
            left: `${(culturalSites.find(s => s.id === selectedSite)?.coordinates.lng || 0 - 70) * 8 + 52}%`,
            top: `${(culturalSites.find(s => s.id === selectedSite)?.coordinates.lat || 0 - 10) * 8 + 20}%`,
          }}
        >
          {culturalSites.filter(s => s.id === selectedSite).map(site => (
            <div key={site.id}>
              <div className="relative h-32">
                <img 
                  src={site.imageUrl} 
                  alt={site.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/400x300/terracotta/white?text=Cultural+Site";
                  }}
                />
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
                  className="w-full py-1.5 bg-terracotta text-white text-sm rounded-md hover:bg-terracotta/90 transition-colors"
                  onClick={() => handleExploreClick(site.id)}
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
        Static Map - Not Interactive
      </div>
    </div>
  );
};

export default Map;
