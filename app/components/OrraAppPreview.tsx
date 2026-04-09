'use client';

import React, { useState, useEffect } from 'react';

const OrraAppPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // The exact names of your screenshots in the public folder
  const images = [
    "/Screenshot_20260408_124223.jpg",
    "/Screenshot_20260408_124228.jpg",
    "/Screenshot_20260408_124254.jpg"
  ];

  useEffect(() => {
    // Change image every 3 seconds (3000 milliseconds)
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-[270px] mx-auto aspect-[10.3/19.5] bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 rounded-[3rem] p-3 border border-purple-500/20 shadow-[0_0_80px_rgba(168,85,247,0.3)]">
      <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
        
        {/* The Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20" />
        
        {/* Sliding Images Container */}
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img 
              key={index}
              src={src} 
              alt={`Orra App Screen ${index + 1}`} 
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default OrraAppPreview;