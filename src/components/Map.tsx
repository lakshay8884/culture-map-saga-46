import React, { useState, useEffect, useRef } from 'react';
import { culturalSites } from '@/data/culturalData';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Map: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Google Maps script is already loaded
    const isScriptLoaded = document.querySelector('script[src*="maps.googleapis.com"]');
    
    if (!isScriptLoaded) {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=maps&v=beta";
      script.defer = true;
      script.async = true;
      script.onload = () => {
        setMapLoaded(true);
        
        // Create and insert the gmp-map element after the script is loaded
        if (mapContainerRef.current) {
          // Clear existing content if any
          mapContainerRef.current.innerHTML = '';
          
          // Create the gmp-map element
          const gmpMap = document.createElement('gmp-map');
          gmpMap.setAttribute('center', '20.5937,78.9629');
          gmpMap.setAttribute('zoom', '4');
          gmpMap.setAttribute('map-id', 'DEMO_MAP_ID');
          gmpMap.className = 'w-full h-full';
          
          // Append to the container
          mapContainerRef.current.appendChild(gmpMap);
        }
      };
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
      
      // If script already loaded, create the map element directly
      setTimeout(() => {
        if (mapContainerRef.current) {
          // Clear existing content if any
          mapContainerRef.current.innerHTML = '';
          
          // Create the gmp-map element
          const gmpMap = document.createElement('gmp-map');
          gmpMap.setAttribute('center', '20.5937,78.9629');
          gmpMap.setAttribute('zoom', '4');
          gmpMap.setAttribute('map-id', 'DEMO_MAP_ID');
          gmpMap.className = 'w-full h-full';
          
          // Append to the container
          mapContainerRef.current.appendChild(gmpMap);
        }
      }, 100);
    }

    return () => {
      // Clean up if component unmounts
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  
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

  // Calculate center of India approximately
  const indiaCenter = { lat: 20.5937, lng: 78.9629 };

  return (
    <div className="relative map-container overflow-hidden">
      {/* Google Maps Integration */}
      <div className="w-full h-full" ref={mapContainerRef}>
        {!mapLoaded && (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="mb-2">Loading Map...</p>
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Map Markers (custom overlay on top of Google Maps) */}
      <div className="absolute inset-0 pointer-events-none">
        {culturalSites.map((site) => (
          <button
            key={site.id}
            className={`absolute rounded-full p-1 ${getCategoryColor(site.category)} shadow-md transform transition-transform hover:scale-125 focus:outline-none pointer-events-auto z-10`}
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
      </div>

      {/* Info Popup */}
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
      
      {/* Information message */}
      {!selectedSite && !mapLoaded && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400 dark:text-gray-500 pointer-events-none">
          <p className="mb-2 font-medium">Interactive Map Preview</p>
          <p className="text-sm">Click on markers to explore cultural sites</p>
        </div>
      )}
    </div>
  );
};

export default Map;
