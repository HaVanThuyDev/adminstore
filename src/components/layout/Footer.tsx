import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../store/settingsContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Github, 
  Linkedin, 
  Facebook, 
  Youtube 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 mt-20 overflow-hidden text-slate-700">
      {/* Subtle tech ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-72 bg-gradient-to-r from-cyan-500/5 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-200">
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group">
              <img
                src="/logo-transparent.png"
                alt="2HT Information Technology"
                className="h-10 sm:h-11 w-auto object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]"
              />
            </Link>

            <p className="text-sm text-slate-700 leading-relaxed max-w-sm">
              “{settings.slogan}” — {settings.mainMessage}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:border-cyan-500/50 hover:shadow-glow-accent transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:border-cyan-500/50 hover:shadow-glow-accent transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:border-cyan-500/50 hover:shadow-glow-accent transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:border-cyan-500/50 hover:shadow-glow-accent transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-cyan-800 bg-cyan-500/15 border border-cyan-500/30 px-3 py-1.5 rounded-full font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-700" /> Kiến trúc phần mềm độc quyền bởi Hà Thượng Thủy
              </span>
            </div>
          </div>

          {/* Column 2: Solutions & Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Khám phá & Doanh nghiệp
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li>
                <Link to="/solutions" className="hover:text-cyan-600 transition-colors">
                  Giải pháp số hóa
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-cyan-600 transition-colors">
                  Dịch vụ phần mềm theo yêu cầu
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-600 transition-colors">
                  Dự án tiêu biểu
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-600 transition-colors">
                  Góc nhìn công nghệ (Blog)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-600 transition-colors">
                  Về 2HT Information Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-cyan-600">
                  {settings.contactEmail}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <span className="font-bold text-slate-900">{settings.hotline}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <span>{settings.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>{settings.copyrightText}</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Chính sách bảo mật</span>
            <span className="hover:text-slate-900 cursor-pointer transition-colors">Điều khoản dịch vụ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
