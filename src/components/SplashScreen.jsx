import { useState, useEffect } from 'react';
import splashscreenImage from '../assets/splashscreen.jpg';
import weddingPhoto from '../assets/wedding-photo.jpg';
import { supabase } from '../lib/supabase.js';

export default function SplashScreen({ onReady }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const imagesToPreload = [splashscreenImage, weddingPhoto];
        const videosToPreload = [];
        let loadedCount = 0;

        // Fetch carousel images from Supabase
        try {
          const { data: carouselData, error: carouselError } = await supabase.storage
            .from('Media')
            .list('images/carousel', {
              limit: 100,
              offset: 0,
              sortBy: { column: 'name', order: 'asc' }
            });

          if (!carouselError && carouselData) {
            const carouselUrls = carouselData
              .filter(file => file.id !== null)
              .map(file => {
                const { data: urlData } = supabase.storage
                  .from('Media')
                  .getPublicUrl(`images/carousel/${file.name}`);
                return urlData.publicUrl;
              });
            
            imagesToPreload.push(...carouselUrls);
          }
        } catch (err) {
          console.warn('Could not fetch carousel images:', err);
        }

        // Fetch gallery images from Supabase
        try {
          const { data: galleryData, error: galleryError } = await supabase.storage
            .from('Media')
            .list('images/gallery', {
              limit: 100,
              offset: 0,
              sortBy: { column: 'name', order: 'desc' }
            });

          if (!galleryError && galleryData) {
            const galleryUrls = galleryData
              .filter(file => file.id !== null)
              .map(file => {
                const { data: urlData } = supabase.storage
                  .from('Media')
                  .getPublicUrl(`images/gallery/${file.name}`);
                return urlData.publicUrl;
              });
            
            imagesToPreload.push(...galleryUrls);
          }
        } catch (err) {
          console.warn('Could not fetch gallery images:', err);
        }

        // Get video URL from Supabase
        try {
          const { data: videoData } = supabase.storage
            .from('Media')
            .getPublicUrl('videos/sample.mp4');
          
          if (videoData?.publicUrl) {
            videosToPreload.push(videoData.publicUrl);
          }
        } catch (err) {
          console.warn('Could not fetch video:', err);
        }

        const totalAssets = imagesToPreload.length + videosToPreload.length;

        // Preload each image with progress tracking
        const imagePromises = imagesToPreload.map(
          (src) =>
            new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              
              const handleLoad = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalAssets) * 100));
                resolve();
              };

              // Resolve even on error to prevent blocking
              img.onload = handleLoad;
              img.onerror = handleLoad;
            })
        );

        // Preload videos
        const videoPromises = videosToPreload.map(
          (src) =>
            new Promise((resolve) => {
              const video = document.createElement('video');
              video.src = src;
              video.preload = 'auto';
              
              const handleLoad = () => {
                loadedCount++;
                setLoadingProgress(Math.round((loadedCount / totalAssets) * 100));
                resolve();
              };

              // Resolve when enough data is loaded
              video.onloadeddata = handleLoad;
              video.onerror = handleLoad;
              
              // Start loading
              video.load();
            })
        );

        // Wait for all assets to load
        await Promise.all([...imagePromises, ...videoPromises]);

        // Small delay for smooth UX
        await new Promise((resolve) => setTimeout(resolve, 300));

        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading assets:', error);
        setError('Failed to load some assets');
        // Still allow user to proceed
        setIsLoading(false);
      }
    };

    preloadAssets();
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-white">
      <div className="md:flex h-full">
        {/* Left side - only shows on desktop */}
        <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
          <img src={weddingPhoto} alt="Wedding Photo" className="w-full h-full object-cover" />
        </div>

        {/* Right side - splash screen content */}
        <div className="w-full md:w-1/2 h-full relative flex items-end justify-center px-2 py-40">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${splashscreenImage})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-lg">
                Dirotsaha <br/>&<br/>Anya
              </h1>
              <p className="text-white/90 text-base md:text-lg drop-shadow">
                24 April 2026
              </p>
            </div>

            {isLoading ? (
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                </div>
                <p className="text-white text-sm drop-shadow">Please wait...</p>
                <p className="text-white/70 text-xs mt-2 drop-shadow">{loadingProgress}%</p>
                {error && <p className="text-red-300 text-xs mt-2">{error}</p>}
              </div>
            ) : (
              <button
                onClick={onReady}
                className="px-10 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50"
              >
                Open Invitation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
