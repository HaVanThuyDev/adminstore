import React, { useState } from 'react';
import { useSettings } from '../../store/settingsContext';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Lock, 
  FileCheck, 
  PhoneCall, 
  Building, 
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettings();

  // Các trường thông tin linh hoạt cho phép thay đổi
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [hotline, setHotline] = useState(settings.hotline);
  const [address, setAddress] = useState(settings.address);
  const [workingHours, setWorkingHours] = useState(settings.workingHours);
  const [slogan, setSlogan] = useState(settings.slogan);
  const [copyrightText, setCopyrightText] = useState(settings.copyrightText);

  // Các trường thương hiệu cốt lõi cố định (read-only view)
  const fixedBrandName = '2HT';
  const fixedSubname = 'Information Technology';
  const fixedTechSlogan = 'Kiến tạo giải pháp số. Nâng tầm doanh nghiệp.';

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      brandName: fixedBrandName,
      brandSubname: fixedSubname,
      mainMessage: fixedTechSlogan,
      slogan,
      contactEmail,
      hotline,
      address,
      workingHours,
      copyrightText,
    });
    toast.success('Đã lưu cấu hình thông tin thành công!');
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục lại thông tin cấu hình mặc định?')) {
      resetSettings();
      setContactEmail('hathuongthuy113@gmail.com');
      setHotline('0383717785');
      setAddress('Nam Từ Liêm - Hà Nội');
      setWorkingHours('Thứ 2 - Thứ 6: 08:30 - 18:00');
      setSlogan('Technology That Builds Your Future');
      setCopyrightText('© 2026 2HT Information Technology. Nền tảng Frontend Demo được xây dựng với React & TypeScript.');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-cyan-600" /> Cấu hình Hệ thống & Thông tin Doanh nghiệp
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Điều chỉnh các thông số liên hệ, hotline, địa chỉ và nội dung hiển thị trên toàn bộ trang web.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Khôi phục mặc định
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Fixed System Identity (Read-only view) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                1. Định danh Thương hiệu Cốt lõi (Cố định theo hệ thống)
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
              <Lock className="w-3 h-3 text-slate-400" /> Fix cứng bảo mật
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-150">
              <span className="text-[11px] text-slate-500 font-medium block">Tên thương hiệu</span>
              <div className="text-base font-black text-slate-900 mt-1 flex items-center gap-1.5">
                <span>{fixedBrandName}</span>
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-150">
              <span className="text-[11px] text-slate-500 font-medium block">Chuyên ngành / Subname</span>
              <div className="text-sm font-bold text-slate-800 mt-1">
                {fixedSubname}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-150">
              <span className="text-[11px] text-slate-500 font-medium block">Thông điệp cốt lõi</span>
              <div className="text-sm font-bold text-slate-800 mt-1 truncate">
                {fixedTechSlogan}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Editable Contact Information (Full Width) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              2. Thông tin Liên hệ Tiếp nhận (Cho phép chỉnh sửa linh hoạt)
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Dữ liệu này được hiển thị trực tiếp tại thanh Header, Footer, trang Liên hệ và các nút widget chat nổi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email tiếp nhận tư vấn / liên hệ
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Số điện thoại Hotline / Zalo chính thức
              </label>
              <input
                type="text"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Địa chỉ văn phòng / Trụ sở chính
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Khung giờ làm việc & Hỗ trợ kỹ thuật
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xs"
                required
              />
            </div>
          </div>
        </div>

        {/* Section 3: Slogan & Copyright */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Building className="w-4 h-4 text-indigo-600" />
              3. Khẩu hiệu Marketing & Dòng chữ bản quyền (Footer)
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Khẩu hiệu phụ (Slogan)
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Dòng chữ bản quyền (Copyright chân trang)
              </label>
              <textarea
                rows={2}
                value={copyrightText}
                onChange={(e) => setCopyrightText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="flex justify-end pt-2">
          <Button
            size="lg"
            variant="primary"
            type="submit"
            icon={<Save className="w-4 h-4" />}
            className="px-8 shadow-md"
          >
            Lưu và Áp dụng Thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
};
