import React from 'react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      {/* Top sleek loading line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 animate-pulse z-50 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      
      {/* Minimalist central spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-cyan-500 animate-spin" />
        <div className="absolute inset-0 rounded-full border-2 border-indigo-400/20 animate-ping" />
      </div>
      <p className="mt-4 text-xs font-semibold tracking-widest uppercase text-slate-400 animate-pulse">
        Đang tải trang...
      </p>
    </div>
  );
};
