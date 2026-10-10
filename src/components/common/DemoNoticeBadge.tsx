import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface DemoNoticeBadgeProps {
  className?: string;
  variant?: 'banner' | 'pill' | 'subtle';
  message?: string;
}

export const DemoNoticeBadge: React.FC<DemoNoticeBadgeProps> = ({
  className = '',
  variant = 'pill',
  message = 'Chế độ Demo Frontend: Toàn bộ dữ liệu mô phỏng bằng localStorage, không kết nối database hay thanh toán thật.',
}) => {
  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border-y border-cyan-500/20 py-2 px-4 text-xs text-cyan-700 flex items-center justify-center gap-2 text-center backdrop-blur-sm ${className}`}>
        <Sparkles className="w-4 h-4 text-cyan-600 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  if (variant === 'subtle') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 border border-cyan-500/20 px-2.5 py-1 rounded-full ${className}`}>
        <Info className="w-3.5 h-3.5 text-cyan-600" />
        <span>Số liệu mô phỏng demo</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 text-xs px-3 py-1.5 rounded-full ${className}`}>
      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
      <span>{message}</span>
    </div>
  );
};
