import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../store/settingsContext';
import { consultationService } from '../../services/consultationService';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { SectionHeading } from '../../components/common/SectionHeading';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const { settings } = useSettings();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [serviceInterest, setServiceInterest] = useState('2HT E-Commerce — Nền tảng bán hàng đa kênh');
  const [estimatedBudget, setEstimatedBudget] = useState('30 - 50 triệu VNĐ');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Vui lòng nhập họ và tên';
    if (!email.trim() || !email.includes('@')) errs.email = 'Vui lòng nhập email hợp lệ';
    if (!phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại';
    if (!message.trim()) errs.message = 'Vui lòng nhập nội dung cần tư vấn';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Vui lòng kiểm tra lại các trường thông tin');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const created = consultationService.create({
        fullName,
        email,
        phone,
        company,
        serviceInterest,
        estimatedBudget,
        message,
      });

      setIsSubmitting(false);
      setSubmittedId(created.id);
      toast.success('Gửi yêu cầu tư vấn thành công!', {
        description: `Mã tiếp nhận: ${created.id}. Dữ liệu đã lưu vào localStorage.`,
      });

      // Clear form
      setFullName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-900 font-medium">Liên hệ & Tư vấn</span>
      </div>

      <SectionHeading
        eyebrow="Tư vấn giải pháp miễn phí"
        title="Bắt đầu dự án cùng chuyên gia 2HT."
        description="Hãy chia sẻ yêu cầu của bạn, đội ngũ chuyên gia công nghệ của chúng tôi sẽ liên hệ lại trong vòng 2 giờ làm việc để tư vấn lộ trình phù hợp nhất."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">
              Thông tin liên hệ trực tiếp
            </h3>

            <div className="space-y-5 text-sm text-slate-600">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase block">Địa điểm làm việc:</span>
                  <span className="text-slate-700">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase block">Email liên hệ:</span>
                  <a href={`mailto:${settings.contactEmail}`} className="text-cyan-400 hover:underline font-mono">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase block">Hotline tư vấn:</span>
                  <span className="text-slate-900 font-bold text-base">{settings.hotline}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase block">Giờ làm việc:</span>
                  <span className="text-slate-700">{settings.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="font-bold text-cyan-400 block mb-1">Cam kết </span>
              Bảo mật tuyệt đối mọi thông tin nghiệp vụ và ý tưởng kinh doanh do quý khách cung cấp.
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          {submittedId ? (
            <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-800 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Yêu cầu tư vấn đã được ghi nhận!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Mã phiếu tư vấn của bạn là <strong className="text-cyan-400 font-mono">{submittedId}</strong>. Dữ liệu đã được lưu trữ thành công trong hệ thống Quản lý yêu cầu (Admin Demo).
              </p>
              <div className="pt-2">
                <Button size="sm" variant="outline" onClick={() => setSubmittedId(null)}>
                  Gửi thêm yêu cầu khác
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">Điền biểu mẫu tư vấn</h3>
                <span className="text-xs text-slate-500">* Bắt buộc điền</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Họ và tên bạn"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={errors.fullName}
                  placeholder="Nguyễn Văn A"
                />
                <Input
                  label="Email doanh nghiệp"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="name@company.vn"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Số điện thoại Zalo / Di động"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={errors.phone}
                  placeholder="0912 345 678"
                />
                <Input
                  label="Tên công ty / Doanh nghiệp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Công ty ABC"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Giải pháp quan tâm
                  </label>
                  <select
                    value={serviceInterest}
                    onChange={(e) => setServiceInterest(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="2HT E-Commerce — Nền tảng bán hàng đa kênh">2HT E-Commerce (Bán lẻ đa kênh)</option>
                    <option value="2HT Residence — Quản lý cư dân & tòa nhà">2HT Residence (Quản lý cư dân)</option>
                    <option value="2HT Business — Quản trị doanh nghiệp tổng thể">2HT Business (ERP Lite)</option>
                    <option value="2HT Sales — Quản lý bán hàng & CRM">2HT Sales (CRM & Pipeline)</option>
                    <option value="2HT HRM — Quản lý nhân sự & chấm công">2HT HRM (Chấm công & Lương)</option>
                    <option value="2HT Finance — Quản trị tài chính & dòng tiền">2HT Finance (Dòng tiền)</option>
                    <option value="Phần mềm may đo theo yêu cầu">May đo theo yêu cầu đặc thù</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                    Ngân sách dự kiến
                  </label>
                  <select
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="Dưới 30 triệu VNĐ">Dưới 30 triệu VNĐ</option>
                    <option value="30 - 50 triệu VNĐ">30 - 50 triệu VNĐ</option>
                    <option value="50 - 100 triệu VNĐ">50 - 100 triệu VNĐ</option>
                    <option value="Trên 100 triệu VNĐ">Trên 100 triệu VNĐ (Quy mô tập đoàn)</option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Mô tả bài toán hoặc nhu cầu của bạn"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={errors.message}
                placeholder="Ví dụ: Chúng tôi cần quản lý 300 căn hộ chung cư, muốn có ứng dụng cư dân và thanh toán phí dịch vụ bằng VietQR..."
              />

              <Button
                size="lg"
                variant="primary"
                fullWidth
                type="submit"
                isLoading={isSubmitting}
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
              >
                Gửi yêu cầu tư vấn ngay
              </Button>

              <div className="flex items-center gap-2 text-[11px] text-cyan-300 bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                <span>Mô phỏng demo: Dữ liệu được lưu trữ trực tiếp vào localStorage và hiển thị tại trang Quản lý yêu cầu Admin.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
