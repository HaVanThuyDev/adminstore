import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { SectionHeading } from '../../components/common/SectionHeading';
import { 
  Building2, 
  ShoppingBag, 
  Factory, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Cpu 
} from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const navigate = useNavigate();

  const verticals = [
    {
      title: 'Giải pháp Đô thị & Bất động sản Thông minh (PropTech)',
      desc: 'Số hóa quản lý chung cư, khu đô thị, cao ốc văn phòng. Tự động hóa hóa đơn dịch vụ, gạch nợ VietQR động và kết nối ứng dụng cư dân.',
      products: ['2HT Residence', 'Smart Parking Hub', 'Tenant Mobile App'],
      icon: Building2,
      tag: 'Bất động sản',
    },
    {
      title: 'Giải pháp Thương mại Điện tử Bán lẻ Đa kênh (Retail Omnichannel)',
      desc: 'Hợp nhất dữ liệu điểm bán (POS), website chuẩn SEO và các sàn thương mại điện tử (Shopee, TikTok Shop). Đồng bộ tồn kho tức thì.',
      products: ['2HT E-Commerce', 'Inventory Sync Engine', 'Omnichannel CRM'],
      icon: ShoppingBag,
      tag: 'Bán lẻ & E-Commerce',
    },
    {
      title: 'Giải pháp Quản trị Vận hành Doanh nghiệp Vừa và Nhỏ (SME ERP)',
      desc: 'Hệ thống phê duyệt điện tử không giấy tờ (e-approval), quản lý dự án Kanban, số hóa hồ sơ nhân sự và kiểm soát chi phí thực thời.',
      products: ['2HT Business', '2HT HRM', '2HT Finance'],
      icon: Factory,
      tag: 'Doanh nghiệp',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <SectionHeading
        eyebrow="Kiến trúc giải pháp theo ngành"
        title="Giải pháp chuyển đổi số toàn diện."
        description="2HT phát triển các gói giải pháp đóng gói chuyên biệt cho từng bài toán kinh doanh cụ thể, giảm 70% thời gian triển khai so với tự phát triển từ đầu."
      />

      <div className="space-y-8">
        {verticals.map((v, i) => {
          const Icon = v.icon;
          return (
            <div
              key={i}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 hover:border-primary/40 transition-all shadow-md hover:shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  {v.tag}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-slate-500 font-semibold self-center">Bao gồm:</span>
                  {v.products.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-primary"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Icon className="w-8 h-8" />
                </div>
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => navigate('/contact')}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Tư vấn lộ trình này
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
