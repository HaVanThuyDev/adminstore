import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useCart } from '../../store/cartContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SoftwarePreviewCard } from '../../components/mockups/SoftwarePreviewCard';
import { LiveProductDemoModal } from '../../components/mockups/LiveProductDemoModal';
import { 
  ChevronRight, 
  Play, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Cpu, 
  HelpCircle, 
  ChevronDown, 
  ArrowRight, 
  Star, 
  Share2,
  Sparkles,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartDrawerOpen } = useCart();

  const [product, setProduct] = useState<Product | undefined>(() => productService.getBySlug(slug || ''));

  useEffect(() => {
    productService.fetchAll().then((list) => {
      const found = list.find((p) => p.slug === slug);
      if (found) setProduct(found);
    });
  }, [slug]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(product?.plans[0]?.id || '');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy sản phẩm</h2>
        <p className="text-slate-500 text-sm">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang danh mục khác.
        </p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Quay lại danh sách sản phẩm
        </Button>
      </div>
    );
  }

  const selectedPlan = product.plans.find((p) => p.id === selectedPlanId) || product.plans[0];
  const relatedProducts = productService.getPublished().filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedPlan) return;
    addToCart({
      productId: product.id,
      productName: `${product.name} (${selectedPlan.name})`,
      productSlug: product.slug,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      price: selectedPlan.price,
      mockupType: product.mockupType,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Đã sao chép liên kết sản phẩm!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/products" className="hover:text-cyan-400 transition-colors">
          Sản phẩm
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-900 font-medium">{product.name}</span>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/25">
              {product.categoryName}
            </span>
            {product.featuredBadge && (
              <Badge variant={product.badgeVariant || 'primary'} size="sm">
                {product.featuredBadge}
              </Badge>
            )}
            <div className="flex items-center gap-1 text-xs text-amber-400 ml-auto">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount} đánh giá)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h1>

          <p className="text-lg text-cyan-400 font-semibold">{product.tagline}</p>

          <p className="text-slate-600 text-base leading-relaxed">{product.longDescription}</p>

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
              Công nghệ phát triển:
            </div>
            <div className="flex flex-wrap gap-2">
              {product.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-600 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-200">
            {product.hasLiveDemo && (
              <Button
                size="lg"
                variant="accent"
                onClick={() => setIsDemoOpen(true)}
                icon={<Play className="w-4 h-4 text-slate-900 fill-white" />}
              >
                Trải nghiệm Live Demo
              </Button>
            )}

            <Button
              size="lg"
              variant="primary"
              onClick={handleAddToCart}
              icon={<ShoppingBag className="w-5 h-5" />}
            >
              Thêm vào giỏ Demo
            </Button>

            <button
              onClick={handleShare}
              className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-cyan-400 hover:border-cyan-500/40 shadow-xs transition-colors"
              title="Chia sẻ liên kết"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Interactive Mockup Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Live UI Simulation
              </span>
              <span className="text-xs text-cyan-400 font-semibold">2HT Production Engine</span>
            </div>

            <SoftwarePreviewCard
              type={product.mockupType}
              previewImage={product.previewImage}
              name={product.name}
            />

            <div className="mt-4 pt-3 border-t border-slate-200 text-center">
              <button
                onClick={() => setIsDemoOpen(true)}
                className="text-xs text-cyan-400 hover:underline flex items-center justify-center gap-1.5 mx-auto font-medium"
              >
                <Zap className="w-3.5 h-3.5" /> Mở chế độ kiểm thử tương tác đầy đủ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="space-y-8 pt-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Tính năng cốt lõi</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Được thiết kế để giải quyết bài toán vận hành
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-cyan-500/40 shadow-xl transition-colors space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Packages Table */}
      <div className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Bảng giá minh họa</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Các gói giải pháp triển khai
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Mức giá demo tham khảo. Đã bao gồm chuyển giao công nghệ và đào tạo vận hành.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {product.plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F8FAFC] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/10'
                    : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300 shadow-xl'
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 right-6 text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 px-3 py-1 rounded-full shadow-md">
                    Khuyên dùng
                  </span>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-slate-300'}`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">{plan.description}</p>

                  <div className="pt-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {plan.price > 0 ? `${plan.price.toLocaleString('vi-VN')} đ` : 'Liên hệ báo giá'}
                    </span>
                    {plan.price > 0 && <span className="text-xs text-slate-500 ml-2">/ {plan.billingCycle}</span>}
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-200 text-xs text-slate-600">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 space-y-2">
                  <Button
                    size="md"
                    variant={isSelected ? 'primary' : 'outline'}
                    fullWidth
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlanId(plan.id);
                      handleBuyNow();
                    }}
                  >
                    Đặt mua gói này (Demo)
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs Accordion */}
      {product.faqs.length > 0 && (
        <div className="space-y-6 pt-8 max-w-3xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Giải đáp thắc mắc</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Câu hỏi thường gặp về {product.name}</h2>
          </div>

          <div className="space-y-3">
            {product.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#F8FAFC] border border-slate-200 overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-slate-800 hover:text-cyan-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="space-y-6 pt-12 border-t border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Sản phẩm liên quan trong hệ sinh thái 2HT</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/products/${p.slug}`)}
              className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-cyan-500/40 shadow-xl hover:shadow-2xl cursor-pointer transition-all space-y-3 group"
            >
              <div className="text-xs font-bold text-cyan-400 uppercase">{p.categoryName}</div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-400 transition-colors">
                {p.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">{p.tagline}</p>
              <div className="text-xs text-cyan-400 font-semibold pt-2 flex items-center gap-1">
                Xem chi tiết <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Demo Modal */}
      <LiveProductDemoModal
        product={product}
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
};
