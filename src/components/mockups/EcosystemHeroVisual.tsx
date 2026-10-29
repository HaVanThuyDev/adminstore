import React from 'react';
import { motion } from 'framer-motion';

export const EcosystemHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center select-none py-2 lg:py-0 gpu-accelerated">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] lg:w-[600px] h-[380px] sm:h-[500px] lg:h-[600px] bg-gradient-to-tr from-cyan-400/25 via-indigo-500/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-2 w-56 sm:w-80 h-56 sm:h-80 bg-cyan-300/20 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Floating 3D Isometric Laptop Container with GPU acceleration */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex items-center justify-center w-full transform-gpu will-change-transform"
      >
        <picture className="w-full flex justify-center">
          <source srcSet="/isometric-laptop-hero.webp" type="image/webp" />
          <img
            src="/isometric-laptop-transparent.png"
            alt="2HT Technology Platform Dashboard Ecosystem"
            width={1400}
            height={1045}
            loading="eager"
            decoding="async"
            // @ts-expect-error fetchpriority is a modern HTML attribute
            fetchpriority="high"
            className="w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[700px] xl:max-w-[780px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(15,23,42,0.18)] transition-transform duration-500 hover:scale-[1.02]"
          />
        </picture>
      </motion.div>
    </div>
  );
};
