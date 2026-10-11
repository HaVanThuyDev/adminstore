import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Sparkles } from 'lucide-react';
import isometricLaptopImg from '../../assets/isometric-laptop-transparent.png';

export const EcosystemHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full flex items-center justify-center select-none py-4 sm:py-6 lg:py-0 gpu-accelerated">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[600px] h-[340px] sm:h-[500px] lg:h-[600px] bg-gradient-to-tr from-cyan-400/25 via-indigo-500/15 to-blue-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-2 w-48 sm:w-80 h-48 sm:h-80 bg-cyan-300/20 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Floating 3D Isometric Laptop Container with GPU acceleration */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex items-center justify-center w-full transform-gpu will-change-transform"
      >
        <img
          src={isometricLaptopImg}
          alt="2HT Technology Platform Dashboard Ecosystem"
          width={1400}
          height={1045}
          loading="eager"
          decoding="async"
          // @ts-expect-error fetchpriority is a modern HTML attribute
          fetchpriority="high"
          className="w-full max-w-[340px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[680px] xl:max-w-[760px] h-auto object-contain drop-shadow-[0_25px_50px_rgba(15,23,42,0.18)] transition-transform duration-500 hover:scale-[1.02]"
        />

        {/* Floating Device Badge: Desktop */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute -top-2 left-2 sm:left-4 md:-left-2 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-xl shadow-cyan-500/10 flex items-center gap-2"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
            <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] sm:text-xs font-bold text-slate-800 flex items-center gap-1">
              <span>Máy tính</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            </div>
            <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono hidden sm:block">Full HD & 4K</div>
          </div>
        </motion.div>

        {/* Floating Device Badge: iPad / Tablet */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute top-1/3 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-xl shadow-indigo-500/10 flex items-center gap-2"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
            <Tablet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] sm:text-xs font-bold text-slate-800">iPad & Tablet</div>
            <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono hidden sm:block">Cảm ứng chạm mượt</div>
          </div>
        </motion.div>

        {/* Floating Device Badge: Mobile Phone */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-2 sm:bottom-0 left-6 sm:left-12 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-xl shadow-cyan-500/10 flex items-center gap-2"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
            <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] sm:text-xs font-bold text-slate-800">Điện thoại</div>
            <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono hidden sm:block">iOS & Android App</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
