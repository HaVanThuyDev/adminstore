import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Send, X, ExternalLink, Mail, MapPin, Headphones } from 'lucide-react';
import { useSettings } from '../../store/settingsContext';

export const FloatingContactWidgets: React.FC = () => {
  const { settings } = useSettings();
  const [activeModal, setActiveModal] = useState<'zalo' | 'facebook' | 'messenger' | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const hotline = settings.hotline || '0383717785';
  const cleanPhone = hotline.replace(/\D/g, '');
  const facebookUrl = settings.socialLinks?.facebook || 'https://facebook.com';
  const messengerUrl = `https://m.me/2ht.technology`;
  const zaloUrl = `https://zalo.me/${cleanPhone}`;

  const widgets = [
    {
      id: 'zalo' as const,
      name: 'Zalo',
      tooltip: 'Chat qua Zalo',
      color: 'bg-[#0068FF] hover:bg-[#0055d4] shadow-[#0068FF]/30 hover:shadow-[#0068FF]/50',
      ringColor: 'ring-[#0068FF]/30',
      icon: (
        <span className="font-extrabold text-xs sm:text-sm tracking-tighter text-white select-none">
          Zalo
        </span>
      ),
      action: () => {
        window.open(zaloUrl, '_blank', 'noopener,noreferrer');
      },
      showInfo: true,
      description: `Kết nối Zalo tư vấn kỹ thuật trực tiếp số: ${hotline}`,
      linkText: 'Mở ứng dụng Zalo',
      linkUrl: zaloUrl,
    },
    {
      id: 'messenger' as const,
      name: 'Messenger',
      tooltip: 'Chat Messenger',
      color: 'bg-gradient-to-tr from-[#00B2FF] via-[#006AFF] to-[#9900FF] shadow-[#0084FF]/30 hover:shadow-[#0084FF]/50',
      ringColor: 'ring-[#0084FF]/30',
      icon: (
        <svg className="w-5 h-5 fill-white drop-shadow-xs" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.516 3.736 7.185V22l3.418-1.876c.905.25 1.865.385 2.846.385 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.002 12.443l-2.56-2.73-5 2.73 5.498-5.837 2.622 2.73 4.938-2.73-5.498 5.837z" />
        </svg>
      ),
      action: () => {
        window.open(messengerUrl, '_blank', 'noopener,noreferrer');
      },
      showInfo: true,
      description: 'Nhắn tin nhanh qua Facebook Messenger để nhận báo giá & tài liệu giải pháp.',
      linkText: 'Mở Facebook Messenger',
      linkUrl: messengerUrl,
    },
    {
      id: 'facebook' as const,
      name: 'Facebook',
      tooltip: 'Fanpage 2HT',
      color: 'bg-[#1877F2] hover:bg-[#166fe5] shadow-[#1877F2]/30 hover:shadow-[#1877F2]/50',
      ringColor: 'ring-[#1877F2]/30',
      icon: (
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      action: () => {
        window.open(facebookUrl, '_blank', 'noopener,noreferrer');
      },
      showInfo: true,
      description: 'Ghé thăm Fanpage chính thức của 2HT Technology để cập nhật sản phẩm & ưu đãi mới nhất.',
      linkText: 'Truy cập Fanpage 2HT',
      linkUrl: facebookUrl,
    },
  ];

  const activeWidget = widgets.find((w) => w.id === activeModal);

  return (
    <>
      {/* Floating Buttons Container */}
      <div className="fixed right-3.5 sm:right-5 bottom-5 sm:bottom-8 z-40 flex flex-col items-center gap-2.5 select-none">
        {/* DESKTOP / TABLET: Always show all 3 widgets */}
        <div className="hidden sm:flex flex-col items-center gap-3">
          {widgets.map((widget, idx) => (
            <div key={widget.id} className="relative group flex items-center">
              {/* Tooltip on hover */}
              <div className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-lg shadow-black/20 flex items-center gap-1.5">
                <span>{widget.tooltip}</span>
                <div className="w-1.5 h-1.5 bg-slate-900/90 rotate-45 absolute -right-0.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Ripple Pulse Effect */}
              <span
                className={`absolute inset-0 rounded-full animate-ping opacity-25 ${widget.color} pointer-events-none`}
                style={{ animationDuration: `${2.4 + idx * 0.4}s` }}
              />

              {/* Main Button */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveModal(widget.id)}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform focus:outline-none ring-4 ${widget.ringColor} ${widget.color}`}
                aria-label={widget.name}
              >
                {widget.icon}
              </motion.button>
            </div>
          ))}
        </div>

        {/* MOBILE (< 640px): Smart Collapsible Widget */}
        <div className="sm:hidden flex flex-col items-end gap-2">
          {/* Expanded List on Mobile */}
          <AnimatePresence>
            {isMobileExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                className="flex flex-col items-center gap-2 mb-1"
              >
                {widgets.map((widget) => (
                  <motion.button
                    key={widget.id}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      setActiveModal(widget.id);
                      setIsMobileExpanded(false);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${widget.color}`}
                    aria-label={widget.name}
                  >
                    {widget.icon}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Trigger Button on Mobile */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-xl shadow-cyan-500/25 flex items-center justify-center relative ring-4 ring-cyan-500/20"
            aria-label="Tư vấn hỗ trợ"
          >
            {isMobileExpanded ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <>
                <Headphones className="w-5 h-5 text-white" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute top-0.5 right-0.5 border-2 border-white animate-pulse" />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Interactive Contact Detail Modal */}
      <AnimatePresence>
        {activeModal && activeWidget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/[0.05]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${activeWidget.color}`}
                >
                  {activeWidget.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{activeWidget.name} 2HT</h3>
                  <p className="text-xs text-slate-500 font-mono">Hỗ trợ kỹ thuật 24/7</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-5 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {activeWidget.description}
              </p>

              <div className="space-y-2">
                <button
                  onClick={activeWidget.action}
                  className={`w-full py-2.5 px-4 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-opacity hover:opacity-95 ${activeWidget.color}`}
                >
                  <span>{activeWidget.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
