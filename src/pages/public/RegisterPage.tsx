import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { DemoNoticeBadge } from '../../components/common/DemoNoticeBadge';
import { User, Mail, Phone, Building } from 'lucide-react';
import { toast } from 'sonner';

export const RegisterPage: React.FC = () => {
  const { registerDemo } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error('Vui lòng điền họ tên và email');
      return;
    }

    registerDemo({ fullName, email, phone, company });
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <img src="/logo.png" alt="2HT Logo" className="h-12 w-auto object-contain" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Đăng ký tài khoản Demo</h1>
        <p className="text-xs text-slate-500">
          Tạo tài khoản thử nghiệm trên trình duyệt để theo dõi lịch sử đơn hàng.
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <DemoNoticeBadge
          variant="pill"
          message="Đăng ký cục bộ (Local Demo Mode)"
          className="w-full justify-center"
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Họ và tên"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            icon={<User className="w-4 h-4" />}
            placeholder="Nguyễn Văn A"
          />

          <Input
            label="Email công việc"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-4 h-4" />}
            placeholder="name@company.vn"
          />

          <Input
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={<Phone className="w-4 h-4" />}
            placeholder="0909 123 456"
          />

          <Input
            label="Tên doanh nghiệp"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            icon={<Building className="w-4 h-4" />}
            placeholder="Công ty ABC"
          />

          <Button size="md" variant="primary" fullWidth type="submit">
            Tạo tài khoản Demo ngay
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Đăng nhập tại đây
          </Link>
        </div>
      </div>
    </div>
  );
};
