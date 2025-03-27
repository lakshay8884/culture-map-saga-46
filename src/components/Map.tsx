
import React, { useState, useEffect, useRef } from 'react';
import { culturalSites } from '@/data/culturalData';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';

const Map: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const navigate = useNavigate();

  const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      try {
        // Check if Google Maps script is already loaded
        if (window.google?.maps) {
          console.log("Google Maps already loaded, reusing existing instance");
          resolve();
          return;
        }

        console.log("Loading Google Maps script");
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap&libraries=maps&v=weekly`;
        script.defer = true;
        script.async = true;
        script.onerror = () => {
          console.error("Failed to load Google Maps script");
          reject(new Error('Google Maps script failed to load'));
        };
        script.onload = () => {
          console.log("Google Maps script loaded successfully");
          resolve();
        };

        // Store the script reference
        scriptRef.current = script;
        document.head.appendChild(script);
      } catch (error) {
        console.error("Error in loadGoogleMapsScript:", error);
        reject(error);
      }
    });
  };

  const createMarkers = () => {
    if (!mapInstanceRef.current || !window.google?.maps?.Marker) {
      console.log("Cannot create markers, map instance or Marker not available");
      return;
    }
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // Create new markers
    culturalSites.forEach(site => {
      const marker = new window.google.maps.Marker({
        position: { lat: site.coordinates.lat, lng: site.coordinates.lng },
        map: mapInstanceRef.current,
        title: site.name,
      });

      marker.addListener('click', () => {
        handleMarkerClick(site.id);
      });

      markersRef.current.push(marker);
    });
  };

  const initializeMap = async () => {
    if (!mapContainerRef.current) {
      console.log("Map container ref not available");
      return;
    }
    
    try {
      if (!window.google?.maps?.importLibrary) {
        console.error('Google Maps API not loaded correctly');
        return;
      }

      const { Map } = await window.google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const indiaCenter = { lat: 20.5937, lng: 78.9629 };
      
      mapInstanceRef.current = new Map(mapContainerRef.current, {
        center: indiaCenter,
        zoom: 4,
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: true,
        zoomControl: true,
      });

      createMarkers();
      setMapLoaded(true);
      console.log("Map initialized successfully");
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    // Define the global callback function for the Google Maps script
    window.initMap = async function() {
      console.log("initMap callback triggered");
      await initializeMap();
    };

    // Load the Google Maps script
    loadGoogleMapsScript().catch(error => {
      console.error("Error loading Google Maps:", error);
    });

    // Cleanup function
    return () => {
      console.log("Map component unmounting, cleaning up resources");
      
      // Clear markers
      markersRef.current.forEach(marker => {
        if (marker) marker.setMap(null);
      });
      markersRef.current = [];
      
      // Clear map instance
      mapInstanceRef.current = null;
      
      // Remove the script element if it exists and we created it
      if (scriptRef.current) {
        try {
          // Check if the script is still in the document before trying to remove it
          const scriptInDocument = document.head.contains(scriptRef.current);
          if (scriptInDocument) {
            document.head.removeChild(scriptRef.current);
            console.log("Google Maps script removed from DOM");
          } else {
            console.log("Script not in document, skipping removal");
          }
        } catch (e) {
          console.error("Error removing script:", e);
        }
        scriptRef.current = null;
      }
      
      // Clean up the global initMap function
      if ('initMap' in window) {
        // @ts-ignore
        window.initMap = undefined;
        console.log("Cleaned up global initMap function");
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

  return (
    <div className="relative map-container overflow-hidden">
      <div className="w-full h-full" id="map" ref={mapContainerRef}>
        {!mapLoaded && (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="mb-2">Loading Map...</p>
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        )}
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
