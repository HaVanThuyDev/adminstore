import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, ArrowUpRight } from 'lucide-react';

export interface SoftwarePreviewCardProps {
  type: 'ecommerce' | 'residence' | 'business' | 'sales' | 'hrm' | 'finance';
  previewImage?: string;
  name?: string;
  className?: string;
}

const softwareMeta: Record<
  string,
  {
    fallbackImage: string;
    urlPath: string;
    tag: string;
    tagColor: string;
    accentGlow: string;
  }
> = {
  ecommerce: {
    fallbackImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/ecommerce-hub',
    tag: 'E-Commerce Omnichannel',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    accentGlow: 'from-cyan-500/20 to-primary/10',
  },
  residence: {
    fallbackImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/smart-residence',
    tag: 'Smart Resident Portal',
    tagColor: 'text-accent bg-accent/10 border-accent/30',
    accentGlow: 'from-accent/20 to-primary/10',
  },
  business: {
    fallbackImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/erp-matrix',
    tag: 'Enterprise ERP & BPM',
    tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
    accentGlow: 'from-indigo-500/20 to-primary/10',
  },
  sales: {
    fallbackImage:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/sales-pipeline',
    tag: 'Sales & CRM 360Â°',
    tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    accentGlow: 'from-amber-500/20 to-orange-500/10',
  },
  hrm: {
    fallbackImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/hrm-attendance',
    tag: 'Smart HRM & Payroll',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    accentGlow: 'from-emerald-500/20 to-teal-500/10',
  },
  finance: {
    fallbackImage:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/finance-radar',
    tag: 'Cashflow Radar & Fiscal',
    tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    accentGlow: 'from-cyan-500/20 to-emerald-500/10',
  },
};

export const SoftwarePreviewCard: React.FC<SoftwarePreviewCardProps> = ({
  type,
  previewImage,
  name,
  className = '',
}) => {
  const meta = softwareMeta[type] || softwareMeta.ecommerce;
  const imageSource = previewImage || meta.fallbackImage;
  const [imgSrc, setImgSrc] = useState(imageSource);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(previewImage || meta.fallbackImage);
    setHasError(false);
  }, [previewImage, meta.fallbackImage]);

  return (
    <div
      className={`w-full rounded-xl overflow-hidden border border-slate-300 bg-white shadow-2xl flex flex-col relative group/preview transition-all duration-300 hover:border-slate-400 ${className}`}
    >
      {/* 1. macOS Style Window Header */}
      <div className="h-8 bg-white px-3 flex items-center justify-between border-b border-slate-200 select-none">
        {/* Left: Window Traffic Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block group-hover/preview:opacity-100 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block group-hover/preview:opacity-100 transition-opacity" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block group-hover/preview:opacity-100 transition-opacity" />
        </div>

        {/* Center: Address Bar */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-mono tracking-tight max-w-[190px] sm:max-w-xs truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{meta.urlPath}</span>
        </div>

        {/* Right: Live Tag */}
        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Active</span>
        </div>
      </div>

      {/* 2. Visual Product Screenshot Canvas */}
      <div className="relative h-48 w-full overflow-hidden bg-white">
        <img
          src={imgSrc}
          alt={name || meta.tag}
          onError={() => {
            if (!hasError) {
              setHasError(true);
              setImgSrc(meta.fallbackImage);
            }
          }}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
          loading="lazy"
        />

        {/* Gradient Scrim Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-slate-950/20 to-transparent pointer-events-none" />

        {/* Subtle tech grid / glow overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${meta.accentGlow} opacity-0 group-hover/preview:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />

        {/* Floating Tag Bottom Left */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 backdrop-blur-md border border-slate-300 shadow-lg">
          <Sparkles className="w-3 h-3 text-accent shrink-0 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-700 tracking-wide">
            {previewImage && name ? name : meta.tag}
          </span>
        </div>

        {/* Preview hover button bottom right */}
        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/preview:translate-y-0 flex items-center gap-1 px-2 py-0.5 rounded bg-primary/90 text-[10px] font-medium text-white shadow-md">
          <span>Giao diá»‡n v3.2</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
