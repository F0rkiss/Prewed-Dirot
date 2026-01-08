import React, { useEffect, useState } from "react";

import img1 from "../../assets/carousel/carousel4.jpg";
import img2 from "../../assets/carousel/carousel3.jpg";
import img3 from "../../assets/carousel/carousel2.jpg";
import img4 from "../../assets/carousel/carousel1.jpg";

const images = [img1, img2, img3, img4];

export default function BackgroundCarousel({ children, interval = 2500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
