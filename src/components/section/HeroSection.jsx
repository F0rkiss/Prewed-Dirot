import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ brideName, groomName, weddingDate }) => {
  return (
    <section className="min-h-screen flex items-end justify-center px-2 py-10 relative">
      <div className="text-center z-10 max-w-md mx-auto">
        {/* Decorative top element */}
        <motion.div 
          className="mb-2 text-gray-300 uppercase tracking-widest"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>Invitation Wedding</p>
        </motion.div>
        
        {/* Names */}
        <h1 className="font-serif">
          <motion.span 
            className="block text-4xl md:text-5xl font-light text-gray-300 mb-3 tracking-wider"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {groomName}
          </motion.span>
          <motion.span 
            className="block text-5xl md:text-6xl italic my-4 text-gray-500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            &
          </motion.span>
          <motion.span 
            className="block text-4xl md:text-5xl font-light text-gray-300 mt-3 tracking-wider"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {brideName}
          </motion.span>
        </h1>
        
        {/* Date */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.div 
            className="w-20 h-[1px] bg-gray-500 mx-auto mb-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          ></motion.div>
          <p className="text-lg md:text-xl text-gray-300 tracking-widest font-light uppercase">
            {weddingDate}
          </p>
          <motion.div 
            className="w-20 h-[1px] bg-gray-500 mx-auto mt-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          ></motion.div>
        </motion.div>
        
        {/* Decorative bottom element */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <i className='bx bx-chevron-down text-gray-500 text-3xl animate-bounce'></i>
        </motion.div>

        <div className="mb-16">
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
