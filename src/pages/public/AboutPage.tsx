import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { useSettings } from '../../store/settingsContext';
import { 
  ShieldCheck, 
  Target, 
  ArrowRight, 
  ChevronRight,
  Cpu,
  Award
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const values = [
    {
      title: 'Tự chủ công nghệ & Tối ưu hiệu năng',
      desc: '100% dòng lệnh trong hệ sinh thái 2HT được các kỹ sư nghiên cứu và tự phát triển, đảm bảo độ linh hoạt khi tùy biến cho khách hàng.',
      icon: Cpu,
    },
    {
      title: 'Giải quyết bài toán thực tế',
      desc: 'Công nghệ chỉ thực sự có giá trị khi giúp doanh nghiệp tiết kiệm chi phí, loại bỏ quy trình rườm rà và gia tăng doanh số.',
      icon: Target,
    },
    {
      title: 'Bảo mật & Ổn định dài hạn',
      desc: 'Thiết kế kiến trúc chuẩn bảo mật quốc tế, dữ liệu sao lưu liên tục và khả năng phục hồi thảm họa tức thì.',
      icon: ShieldCheck,
    },
    {
      title: 'Đồng hành trọn vòng đời sản phẩm',
      desc: 'Không dừng lại ở việc bàn giao phần mềm, 2HT hỗ trợ đào tạo người dùng và nâng cấp công nghệ định kỳ.',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium">Giới thiệu 2HT</span>
      </div>

      {/* Hero About */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Về chúng tôi
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            2HT Information Technology
          </h1>
          <p className="text-lg text-primary font-semibold">
            “{settings.slogan}”
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            Được thành lập với sứ mệnh tiên phong kiến tạo các giải pháp phần mềm chất lượng cao cho thị trường Việt Nam và khu vực, 2HT Information Technology tập trung nghiên cứu các nền tảng SaaS hiện đại: Quản trị cư dân số, Thương mại điện tử đa kênh, ERP doanh nghiệp và Hệ thống chấm công nhân sự thông minh.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Liên hệ hợp tác cùng 2HT
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-8 space-y-6 shadow-xl relative glow-border">
          <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
            Tầm nhìn & Sứ mệnh cốt lõi
          </h3>
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              <strong className="text-primary block mb-1 font-bold">Tầm nhìn:</strong>
              Trở thành đơn vị công nghệ hàng đầu về phát triển giải pháp phần mềm doanh nghiệp tự chủ tại Việt Nam, mang đến trải nghiệm phần mềm chuẩn quốc tế.
            </p>
            <p>
              <strong className="text-accent block mb-1 font-bold">Sứ mệnh:</strong>
              Giúp 10,000+ doanh nghiệp số hóa vận hành thành công, tiết kiệm hàng triệu giờ làm việc thủ công và bứt phá doanh thu.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Giá trị cốt lõi"
          title="Những nguyên tắc định hình sản phẩm 2HT"
          description="Chúng tôi tin rằng phần mềm xuất sắc phải đáp ứng hài hòa giữa tốc độ, độ ổn định và trải nghiệm người dùng."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-primary/40 hover:shadow-lg transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
