
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Star, Globe, Info, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { culturalSites } from '@/data/culturalData';

// Map of site IDs to 360° view URLs
const virtualTourLinks: Record<string, string> = {
  'taj-mahal': 'https://www.360panoramas.co.uk/17/467/Taj_Mahal',
  'hawa-mahal': 'http://www.360cities.net/image/jaipur-hawa-mahal-facade#30.62,16.29,110.0',
  'meenakshi-temple': 'https://www.view360.in/vtour-3dvr-madurai.html'
};

declare global {
  interface Window {
    google: any;
    initDetailMap: () => void;
  }
}

const API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState(culturalSites.find(site => site.id === id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const detailMapContainerRef = useRef<HTMLDivElement>(null);
  const detailMapInstanceRef = useRef<google.maps.Map | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const mapLoaderPromiseRef = useRef<Promise<void> | null>(null);
  
  // Check for user's preferred color scheme on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
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

  // Function to load the Google Maps script
  const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      try {
        // Check if Google Maps script is already loaded
        if (window.google?.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initDetailMap&libraries=maps&v=weekly`;
        script.defer = true;
        script.async = true;
        script.onerror = () => reject(new Error('Google Maps script failed to load'));
        script.onload = () => resolve();
        document.head.appendChild(script);
        scriptRef.current = script;
      } catch (error) {
        reject(error);
      }
    });
  };

  // Initialize the map for the detail page
  const initializeDetailMap = async () => {
    if (!detailMapContainerRef.current || !site) return;
    
    try {
      if (!window.google?.maps?.importLibrary) {
        console.error('Google Maps API not loaded correctly');
        return;
      }

      const { Map, Marker } = await window.google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const siteLocation = { 
        lat: site.coordinates.lat, 
        lng: site.coordinates.lng 
      };
      
      detailMapInstanceRef.current = new Map(detailMapContainerRef.current, {
        center: siteLocation,
        zoom: 14,
        mapId: 'DEMO_MAP_ID',
        zoomControl: true,
      });

      // Add a marker for the site location
      if (Marker) {
        // Remove previous marker if it exists
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        
        markerRef.current = new Marker({
          position: siteLocation,
          map: detailMapInstanceRef.current,
          title: site.name,
        });
      }
      
      setMapLoaded(true);
    } catch (error) {
      console.error('Error initializing detail map:', error);
    }
  };

  useEffect(() => {
    setSite(culturalSites.find(site => site.id === id));
    window.scrollTo(0, 0);
    
    // Reset map loaded state
    setMapLoaded(false);
    
    return () => {
      // Clean up resources when id changes
      cleanupMap();
    };
  }, [id]);

  // Clean up map resources
  const cleanupMap = () => {
    // Remove marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    
    // Reset map instance
    detailMapInstanceRef.current = null;
  };

  useEffect(() => {
    // Define the global initDetailMap function
    window.initDetailMap = async function() {
      await initializeDetailMap();
    };

    if (site) {
      // Load Google Maps if not already loaded
      if (!mapLoaderPromiseRef.current) {
        mapLoaderPromiseRef.current = loadGoogleMapsScript();
      } else {
        // If the script is already loaded, initialize the map directly
        if (window.google?.maps) {
          initializeDetailMap();
        }
      }
    }
    
    return () => {
      // Clean up resources
      cleanupMap();
      
      // Remove script element if it exists and we created it
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        try {
          document.head.removeChild(scriptRef.current);
        } catch (e) {
          console.warn('Failed to remove script:', e);
        }
        scriptRef.current = null;
      }
      
      // Remove global initDetailMap function
      if ('initDetailMap' in window) {
        // @ts-ignore
        window.initDetailMap = undefined;
      }
      
      // Reset loader promise
      mapLoaderPromiseRef.current = null;
    };
  }, [site]);

  if (!site) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Site Not Found</h2>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  // Find related sites (same region or category, excluding current site)
  const relatedSites = culturalSites
    .filter(s => (s.regionId === site.regionId || s.category === site.category) && s.id !== site.id)
    .slice(0, 3);

  // Check if this site has a virtual tour link
  const has360Tour = virtualTourLinks[site.id] !== undefined;

  return (
    <div className="min-h-screen">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img 
            src={site.imageUrl} 
            alt={site.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="container mx-auto">
              <Link to="/" className="inline-flex items-center text-white mb-4 hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Discover
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2">
                {site.name}
              </h1>
              <div className="flex items-center text-white/80 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{site.location}</span>
                <span className="mx-3">•</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-gold fill-current" />
                  <span>{site.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="glass-card p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-900 dark:text-white">About</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {site.description}
                </p>
                
                <h3 className="text-xl font-serif font-semibold mb-3 text-gray-900 dark:text-white">Cultural Significance</h3>
                <div className="flex items-start space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-deepBlue/10 dark:bg-deepBlue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-4 h-4 text-deepBlue dark:text-gold" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {site.shortDescription} This iconic location stands as a testament to India's rich cultural heritage and architectural mastery, attracting visitors from around the world.
                  </p>
                </div>

                {virtualTourLinks[site.id] && (
                  <div className="mb-6">
                    <a 
                      href={virtualTourLinks[site.id]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <span>Experience 360° Virtual Tour</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                <h3 className="text-xl font-serif font-semibold mb-3 text-gray-900 dark:text-white">Facts & Trivia</h3>
                <ul className="space-y-3 mb-6">
                  {site.facts.map((fact, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Info className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{fact}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo Gallery */}
              <div className="glass-card p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-900 dark:text-white">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {site.gallery.map((image, index) => (
                    <div 
                      key={index} 
                      className="rounded-lg overflow-hidden aspect-video cursor-pointer hover-lift"
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${site.name} - Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Location */}
              <div className="glass-card p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-serif font-semibold mb-4 text-gray-900 dark:text-white">Location</h2>
                <div className="h-64 rounded-lg overflow-hidden relative">
                  <div id="detailMap" ref={detailMapContainerRef} className="w-full h-full">
                    {!mapLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800">
                        <div className="text-center">
                          <MapPin className="w-8 h-8 mx-auto mb-2" />
                          <p>Loading Map - {site?.location}</p>
                          <p className="text-sm mt-1">Coordinates: {site?.coordinates.lat}, {site?.coordinates.lng}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              {/* Related Sites */}
              <div className="glass-card p-6 rounded-xl mb-8">
                <h3 className="text-xl font-serif font-semibold mb-4 text-gray-900 dark:text-white">Related Sites</h3>
                <div className="space-y-4">
                  {relatedSites.map(relatedSite => (
                    <Link 
                      key={relatedSite.id} 
                      to={`/detail/${relatedSite.id}`}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={relatedSite.imageUrl} 
                          alt={relatedSite.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{relatedSite.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{relatedSite.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Best Time to Visit */}
              <div className="glass-card p-6 rounded-xl mb-8">
                <h3 className="text-xl font-serif font-semibold mb-3 text-gray-900 dark:text-white">Best Time to Visit</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The ideal time to visit {site.name} is during the months of October to March when the weather is pleasant and comfortable for sightseeing.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Weather Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Winter (Oct-Feb)</span>
                      <span className="text-gray-900 dark:text-gray-200">15°C - 25°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Summer (Mar-Jun)</span>
                      <span className="text-gray-900 dark:text-gray-200">25°C - 40°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Monsoon (Jul-Sep)</span>
                      <span className="text-gray-900 dark:text-gray-200">20°C - 35°C</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Planning */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-3 text-gray-900 dark:text-white">Plan Your Visit</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Entry Fee</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Indians: ₹50 <br />
                      Foreigners: ₹500
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Opening Hours</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Open daily from 6:00 AM to 6:30 PM <br />
                      Closed on Fridays
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Duration</h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Recommended: 2-3 hours
                    </p>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
                  Book a Guided Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Astiva - Seek the Soul of India. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Image Lightbox */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveImageIndex(0)}
        >
          <button 
            className="absolute top-4 right-4 text-white w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex(0);
            }}
          >
            ×
          </button>
          <img 
            src={site.gallery[activeImageIndex]} 
            alt={site.name}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Detail;
