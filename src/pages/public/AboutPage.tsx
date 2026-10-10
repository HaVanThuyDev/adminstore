import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { useSettings } from '../../store/settingsContext';
import { 
  ShieldCheck, 
  Target, 
  Lightbulb, 
  Users, 
  ArrowRight, 
  ChevronRight,
  Code2,
  Cpu,
  Award
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();

  const values = [
    {
      title: 'Tá»± chá»§ cÃ´ng nghá»‡ & Tá»‘i Æ°u hiá»‡u nÄƒng',
      desc: '100% dÃ²ng lá»‡nh trong há»‡ sinh thÃ¡i 2HT Ä‘Æ°á»£c cÃ¡c ká»¹ sÆ° nghiÃªn cá»©u vÃ  tá»± phÃ¡t triá»ƒn, Ä‘áº£m báº£o Ä‘á»™ linh hoáº¡t khi tÃ¹y biáº¿n cho khÃ¡ch hÃ ng.',
      icon: Cpu,
    },
    {
      title: 'Giáº£i quyáº¿t bÃ i toÃ¡n thá»±c táº¿',
      desc: 'CÃ´ng nghá»‡ chá»‰ thá»±c sá»± cÃ³ giÃ¡ trá»‹ khi giÃºp doanh nghiá»‡p tiáº¿t kiá»‡m chi phÃ­, loáº¡i bá» quy trÃ¬nh rÆ°á»m rÃ  vÃ  gia tÄƒng doanh sá»‘.',
      icon: Target,
    },
    {
      title: 'Báº£o máº­t & á»”n Ä‘á»‹nh dÃ i háº¡n',
      desc: 'Thiáº¿t káº¿ kiáº¿n trÃºc chuáº©n báº£o máº­t quá»‘c táº¿, dá»¯ liá»‡u sao lÆ°u liÃªn tá»¥c vÃ  kháº£ nÄƒng phá»¥c há»“i tháº£m há»a tá»©c thÃ¬.',
      icon: ShieldCheck,
    },
    {
      title: 'Äá»“ng hÃ nh trá»n vÃ²ng Ä‘á»i sáº£n pháº©m',
      desc: 'KhÃ´ng dá»«ng láº¡i á»Ÿ viá»‡c bÃ n giao pháº§n má»m, 2HT há»— trá»£ Ä‘Ã o táº¡o ngÆ°á»i dÃ¹ng vÃ  nÃ¢ng cáº¥p cÃ´ng nghá»‡ Ä‘á»‹nh ká»³.',
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-primary transition-colors">
          Trang chá»§
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium">Giá»›i thiá»‡u 2HT</span>
      </div>

      {/* Hero About */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Vá» chÃºng tÃ´i
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            2HT Information Technology
          </h1>
          <p className="text-lg text-primary font-semibold">
            â€œ{settings.slogan}â€
          </p>
          <p className="text-slate-600 text-base leading-relaxed">
            ÄÆ°á»£c thÃ nh láº­p vá»›i sá»© má»‡nh tiÃªn phong kiáº¿n táº¡o cÃ¡c giáº£i phÃ¡p pháº§n má»m cháº¥t lÆ°á»£ng cao cho thá»‹ trÆ°á»ng Viá»‡t Nam vÃ  khu vá»±c, 2HT Information Technology táº­p trung nghiÃªn cá»©u cÃ¡c ná»n táº£ng SaaS hiá»‡n Ä‘áº¡i: Quáº£n trá»‹ cÆ° dÃ¢n sá»‘, ThÆ°Æ¡ng máº¡i Ä‘iá»‡n tá»­ Ä‘a kÃªnh, ERP doanh nghiá»‡p vÃ  Há»‡ thá»‘ng cháº¥m cÃ´ng nhÃ¢n sá»± thÃ´ng minh.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              LiÃªn há»‡ há»£p tÃ¡c cÃ¹ng 2HT
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-8 space-y-6 shadow-xl relative glow-border">
          <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
            Táº§m nhÃ¬n & Sá»© má»‡nh cá»‘t lÃµi
          </h3>
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <p>
              <strong className="text-primary block mb-1 font-bold">Táº§m nhÃ¬n:</strong>
              Trá»Ÿ thÃ nh Ä‘Æ¡n vá»‹ cÃ´ng nghá»‡ hÃ ng Ä‘áº§u vá» phÃ¡t triá»ƒn giáº£i phÃ¡p pháº§n má»m doanh nghiá»‡p tá»± chá»§ táº¡i Viá»‡t Nam, mang Ä‘áº¿n tráº£i nghiá»‡m pháº§n má»m chuáº©n quá»‘c táº¿.
            </p>
            <p>
              <strong className="text-accent block mb-1 font-bold">Sá»© má»‡nh:</strong>
              GiÃºp 10,000+ doanh nghiá»‡p sá»‘ hÃ³a váº­n hÃ nh thÃ nh cÃ´ng, tiáº¿t kiá»‡m hÃ ng triá»‡u giá» lÃ m viá»‡c thá»§ cÃ´ng vÃ  bá»©t phÃ¡ doanh thu.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-10">
        <SectionHeading
          eyebrow="GiÃ¡ trá»‹ cá»‘t lÃµi"
          title="Nhá»¯ng nguyÃªn táº¯c Ä‘á»‹nh hÃ¬nh sáº£n pháº©m 2HT"
          description="ChÃºng tÃ´i tin ráº±ng pháº§n má»m xuáº¥t sáº¯c pháº£i Ä‘Ã¡p á»©ng hÃ i hÃ²a giá»¯a tá»‘c Ä‘á»™, Ä‘á»™ á»•n Ä‘á»‹nh vÃ  tráº£i nghiá»‡m ngÆ°á»i dÃ¹ng."
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
