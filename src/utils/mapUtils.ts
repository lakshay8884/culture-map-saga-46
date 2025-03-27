
/**
 * Utility functions for Google Maps loading and management
 */

// API key for Google Maps
export const MAPS_API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';

// Tracks if a script loading is in progress
let loadingPromise: Promise<void> | null = null;

/**
 * Loads the Google Maps script if not already loaded
 * Returns a promise that resolves when the script is loaded
 */
export const loadGoogleMapsScript = (callbackName: string): Promise<void> => {
  // If already loading, return the existing promise
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise<void>((resolve, reject) => {
    try {
      // Check if Google Maps script is already loaded
      if (window.google?.maps) {
        console.log("Google Maps already loaded, reusing existing instance");
        resolve();
        return;
      }

      console.log(`Loading Google Maps script with callback: ${callbackName}`);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=${callbackName}&libraries=maps&v=weekly`;
      script.defer = true;
      script.async = true;
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
        loadingPromise = null; // Reset for retry
        reject(new Error('Google Maps script failed to load'));
      };
      script.onload = () => {
        console.log("Google Maps script loaded successfully");
        resolve();
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error("Error in loadGoogleMapsScript:", error);
      loadingPromise = null; // Reset for retry
      reject(error);
    }
  });

  return loadingPromise;
};

/**
 * Safely removes a script element from the DOM
 */
export const safeRemoveScript = (script: HTMLScriptElement | null): void => {
  if (!script) return;
  
  try {
    // Check if the script is still in the document before trying to remove it
    const scriptInDocument = document.head.contains(script) || document.body.contains(script);
    if (scriptInDocument) {
      script.parentNode?.removeChild(script);
      console.log("Script element removed from DOM");
    } else {
      console.log("Script not in document, skipping removal");
    }
  } catch (e) {
    console.error("Error removing script:", e);
  }
};

/**
 * Resets the Google Maps loading state
 */
export const resetGoogleMapsLoading = (): void => {
  loadingPromise = null;
};
