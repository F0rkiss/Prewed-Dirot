import React from 'react';

const HeroSection = ({ brideName, groomName, weddingDate }) => {
  return (
    <section className="min-h-screen flex items-end justify-center px-2 py-10 relative">
      <div className="text-center z-10 max-w-md mx-auto">
        {/* Decorative top element */}
        <div className="mb-2 text-gray-300 uppercase tracking-widest">
          <p>Invitation Wedding</p>
        </div>
        
        {/* Names */}
        <h1 className="font-serif">
          <span className="block text-4xl md:text-5xl font-light text-gray-300 mb-3 tracking-wider">
            {groomName}
          </span>
          <span className="block text-5xl md:text-6xl italic my-4 text-gray-500">
            &
          </span>
          <span className="block text-4xl md:text-5xl font-light text-gray-300 mt-3 tracking-wider">
            {brideName}
          </span>
        </h1>
        
        {/* Date */}
        <div className="mt-6">
          <div className="w-20 h-[1px] bg-gray-500 mx-auto mb-2"></div>
          <p className="text-lg md:text-xl text-gray-300 tracking-widest font-light uppercase">
            {weddingDate}
          </p>
          <div className="w-20 h-[1px] bg-gray-500 mx-auto mt-2"></div>
        </div>
        
        {/* Decorative bottom element */}
        <div className="mt-8">
          <i className='bx bx-chevron-down text-gray-500 text-3xl animate-bounce'></i>
        </div>

        <div className="mb-16">
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
