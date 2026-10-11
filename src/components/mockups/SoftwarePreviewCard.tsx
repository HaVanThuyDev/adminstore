import React, { useState } from 'react';
import { Sparkles, Lock, ArrowUpRight, Monitor, Tablet, Smartphone } from 'lucide-react';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export interface SoftwarePreviewCardProps {
  type: 'ecommerce' | 'residence' | 'business' | 'sales' | 'hrm' | 'finance';
  previewImage?: string;
  name?: string;
  className?: string;
  showDeviceSwitcher?: boolean;
  defaultDevice?: DeviceType;
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
    tagColor: 'text-cyan-500 bg-cyan-50 border-cyan-200',
    accentGlow: 'from-cyan-500/20 to-primary/10',
  },
  residence: {
    fallbackImage:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/smart-residence',
    tag: 'Smart Resident Portal',
    tagColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    accentGlow: 'from-cyan-500/20 to-primary/10',
  },
  business: {
    fallbackImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/erp-matrix',
    tag: 'Enterprise ERP & BPM',
    tagColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    accentGlow: 'from-indigo-500/20 to-primary/10',
  },
  sales: {
    fallbackImage:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/sales-pipeline',
    tag: 'Sales & CRM 360°',
    tagColor: 'text-amber-600 bg-amber-50 border-amber-200',
    accentGlow: 'from-amber-500/20 to-orange-500/10',
  },
  hrm: {
    fallbackImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/hrm-attendance',
    tag: 'Smart HRM & Payroll',
    tagColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    accentGlow: 'from-emerald-500/20 to-teal-500/10',
  },
  finance: {
    fallbackImage:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    urlPath: 'app.2ht.vn/finance-radar',
    tag: 'Cashflow Radar & Fiscal',
    tagColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    accentGlow: 'from-cyan-500/20 to-emerald-500/10',
  },
};

export const SoftwarePreviewCard: React.FC<SoftwarePreviewCardProps> = ({
  type,
  previewImage,
  name,
  className = '',
  showDeviceSwitcher = true,
  defaultDevice = 'desktop',
}) => {
  const [device, setDevice] = useState<DeviceType>(defaultDevice);
  const meta = softwareMeta[type] || softwareMeta.ecommerce;
  const imageSource = previewImage || meta.fallbackImage;
  const [imgSrc, setImgSrc] = useState(imageSource);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`w-full flex flex-col items-center select-none ${className}`}>
      {/* 1. Device Mode Switcher Buttons */}
      {showDeviceSwitcher && (
        <div className="w-full flex items-center justify-between gap-2 mb-3 px-1">
          <div className="text-[11px] sm:text-xs font-semibold text-slate-500 hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Tương thích đa thiết bị:
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 shadow-xs ml-auto">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                device === 'desktop'
                  ? 'bg-white text-cyan-700 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              title="Xem giao diện trên Máy tính (Desktop/Laptop)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Máy tính</span>
            </button>

            <button
              type="button"
              onClick={() => setDevice('tablet')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                device === 'tablet'
                  ? 'bg-white text-cyan-700 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              title="Xem giao diện trên iPad / Máy tính bảng"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>iPad</span>
            </button>

            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                device === 'mobile'
                  ? 'bg-white text-cyan-700 shadow-xs border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
              title="Xem giao diện trên Điện thoại di động (Mobile)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Điện thoại</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Responsive Device Frames Rendering */}
      <div className="w-full flex items-center justify-center transition-all duration-500 ease-out py-1">
        {/* DESKTOP (Máy tính) FRAME */}
        {device === 'desktop' && (
          <div className="w-full rounded-xl overflow-hidden border border-slate-300 bg-white shadow-2xl flex flex-col relative group/preview transition-all duration-300 hover:border-cyan-400">
            {/* macOS Browser Bar */}
            <div className="h-8 bg-slate-100/90 px-3 flex items-center justify-between border-b border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-500 font-mono tracking-tight max-w-[170px] sm:max-w-xs truncate shadow-xs">
                <Lock className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                <span className="truncate">{meta.urlPath}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">Active</span>
              </div>
            </div>

            {/* Screen Content */}
            <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-slate-50">
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                <Sparkles className="w-3 h-3 text-cyan-600 shrink-0 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-700 tracking-wide">{meta.tag}</span>
              </div>
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-600 text-[10px] font-medium text-white shadow-md">
                <span>Desktop View</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        )}

        {/* TABLET / IPAD FRAME */}
        {device === 'tablet' && (
          <div className="w-[90%] sm:w-[80%] max-w-[480px] rounded-[22px] p-2.5 sm:p-3 bg-slate-900 shadow-2xl border-2 border-slate-700/80 transition-all duration-300 relative group/preview">
            {/* iPad Camera Dot */}
            <div className="w-2 h-2 rounded-full bg-slate-700 mx-auto mb-2 border border-slate-600" />
            
            <div className="rounded-xl overflow-hidden bg-white border border-slate-300 relative">
              <div className="h-6 bg-slate-100 px-3 flex items-center justify-between border-b border-slate-200 text-[9px] font-mono text-slate-500">
                <span className="flex items-center gap-1"><Lock className="w-2.5 h-2.5 text-emerald-500" /> iPad Safari</span>
                <span>{meta.urlPath}</span>
              </div>
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-50">
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 text-[10px] font-bold text-slate-700 shadow-xs">
                  <span>iPad UI • 10.9"</span>
                </div>
              </div>
            </div>
            
            {/* iPad Bottom Indicator */}
            <div className="w-20 h-1 rounded-full bg-slate-600 mx-auto mt-2" />
          </div>
        )}

        {/* MOBILE / PHONE FRAME */}
        {device === 'mobile' && (
          <div className="w-[240px] sm:w-[260px] rounded-[30px] p-2 sm:p-2.5 bg-slate-900 shadow-2xl border-2 border-slate-700/90 transition-all duration-300 relative group/preview">
            {/* Dynamic Island / Notch */}
            <div className="w-16 h-3 rounded-full bg-black mx-auto mb-1.5 border border-slate-800 flex items-center justify-end px-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-ping inline-block" />
            </div>

            <div className="rounded-[20px] overflow-hidden bg-white border border-slate-200 relative">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-50">
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 text-[9px] font-bold text-slate-700 shadow-xs">
                  <span>Mobile App • iOS/Android</span>
                </div>
              </div>
            </div>

            {/* Home Bar Indicator */}
            <div className="w-16 h-1 rounded-full bg-slate-500 mx-auto mt-1.5" />
          </div>
        )}
      </div>
    </div>
  );
};
