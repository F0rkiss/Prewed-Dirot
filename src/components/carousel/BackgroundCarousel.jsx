import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";

export default function BackgroundCarousel({ children, interval = 2500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase.storage
        .from('Media')
        .list('images/carousel', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) {
        console.error('Error fetching carousel images:', error);
        return;
      }

      // Convert file list to full URLs
      const imageUrls = data
        .filter(file => file.id !== null)
        .map(file => {
          const { data: urlData } = supabase.storage
            .from('Media')
            .getPublicUrl(`images/carousel/${file.name}`);
          return urlData.publicUrl;
        });

      setImages(imageUrls);
    }

    fetchImages();
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(id);
  }, [interval]);

  return (
    <div className="relative w-full h-full">
      {/* Background layers with fade animation */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Foreground content */}
      <div className="relative z-10 w-full h-full overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
