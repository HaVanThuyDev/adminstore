import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { SectionHeading } from '../../components/common/SectionHeading';
import { 
  Code2, 
  Smartphone, 
  CloudRain, 
  ShieldCheck, 
  Cpu, 
  ArrowRight,
  Database,
  Terminal
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: 'Phát triển Phần mềm Theo yêu cầu (Bespoke Software)',
      desc: 'Thiết kế và lập trình các hệ thống phần mềm nghiệp vụ đặc thù cho doanh nghiệp, đảm bảo quyền sở hữu mã nguồn trọn vẹn.',
      icon: Terminal,
    },
    {
      title: 'Phát triển Ứng dụng Di động (Mobile Apps iOS & Android)',
      desc: 'Xây dựng ứng dụng di động hiệu năng cao bằng React Native / Flutter, đồng bộ thời gian thực với backend Spring Boot.',
      icon: Smartphone,
    },
    {
      title: 'Thiết kế Kiến trúc Hệ thống & Microservices',
      desc: 'Tái cấu trúc hệ thống monolithic cũ thành kiến trúc microservices chịu tải cao, container hóa Docker và Kubernetes.',
      icon: Cpu,
    },
    {
      title: 'DevOps & Di chuyển Đám mây (Cloud Migration)',
      desc: 'Thiết lập luồng CI/CD tự động, giám sát bảo mật hệ thống, tối ưu chi phí hạ tầng máy chủ AWS / Private Cloud.',
      icon: CloudRain,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionHeading
        eyebrow="Dịch vụ công nghệ"
        title="Dịch vụ phát triển phần mềm chuyên nghiệp."
        description="Đội ngũ kỹ sư tại 2HT đồng hành cùng doanh nghiệp từ khâu ý tưởng, thiết kế kiến trúc đến triển khai vận hành thực tế."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-primary/40 hover:shadow-xl transition-all space-y-4 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Yêu cầu báo giá dịch vụ
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
