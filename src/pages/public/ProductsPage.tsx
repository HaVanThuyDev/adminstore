import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Product, ProductCategory } from '../../types/product';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SoftwarePreviewCard } from '../../components/mockups/SoftwarePreviewCard';
import { LiveProductDemoModal } from '../../components/mockups/LiveProductDemoModal';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Play, 
  ArrowRight, 
  ChevronRight,
  SlidersHorizontal,
  PackageOpen,
  Sparkles
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [demoOnly, setDemoOnly] = useState<boolean>(searchParams.get('demo') === 'true');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<string>('all');

  const [selectedDemoProduct, setSelectedDemoProduct] = useState<Product | null>(null);

  const [allProducts, setAllProducts] = useState<Product[]>(() => productService.getPublished());

  useEffect(() => {
    productService.fetchAll().then((products) => {
      if (Array.isArray(products) && products.length > 0) {
        setAllProducts(products.filter((p) => p.isPublished));
      }
    });
  }, []);

  const categories = [
    { id: 'all', name: 'Tất cả giải pháp' },
    { id: 'ecommerce', name: 'Thương mại điện tử' },
    { id: 'management', name: 'Phần mềm quản lý' },
    { id: 'finance', name: 'Tài chính & Dòng tiền' },
    { id: 'hrm', name: 'Nhân sự HRM' },
    { id: 'custom', name: 'Bán hàng & CRM' },
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Demo filter
      if (demoOnly && !product.hasLiveDemo) {
        return false;
      }

      // Search filter
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTech = product.techStack.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTech) return false;
      }

      // Price range filter
      if (priceRange === 'under_20m' && product.basePrice > 20000000) return false;
      if (priceRange === '20m_30m' && (product.basePrice < 20000000 || product.basePrice > 30000000)) return false;
      if (priceRange === 'above_30m' && product.basePrice < 30000000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price_desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });
  }, [allProducts, selectedCategory, demoOnly, searchTerm, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setDemoOnly(false);
    setSortBy('featured');
    setPriceRange('all');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-cyan-400 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium">Sản phẩm phần mềm</span>
      </div>

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-xs font-bold text-cyan-400 uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Danh mục giải pháp
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Hệ sinh thái sản phẩm công nghệ 2HT
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Tất cả sản phẩm đều được phát triển bài bản, bảo mật cao và sẵn sàng thử nghiệm trực tiếp trên môi trường demo.
        </p>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm sản phẩm theo tên, công nghệ (VD: React, Spring Boot)..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Sort By */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            >
              <option value="featured">Sắp xếp: Nổi bật nhất</option>
              <option value="price_asc">Giá: Thấp đến cao</option>
              <option value="price_desc">Giá: Cao đến thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="md:col-span-3">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            >
              <option value="all">Khoảng giá: Tất cả</option>
              <option value="under_20m">Dưới 20 triệu VNĐ</option>
              <option value="20m_30m">Từ 20 - 30 triệu VNĐ</option>
              <option value="above_30m">Trên 30 triệu VNĐ</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Demo Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-primary text-slate-900 shadow-glow-primary border border-primary/50'
                    : 'bg-white text-slate-600 hover:text-cyan-400 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
              <input
                type="checkbox"
                checked={demoOnly}
                onChange={(e) => setDemoOnly(e.target.checked)}
                className="rounded bg-white border-slate-300 text-cyan-400 focus:ring-cyan-500 w-4 h-4"
              />
              <span>Chỉ hiện sản phẩm có Live Demo</span>
            </label>

            {(searchTerm || selectedCategory !== 'all' || demoOnly || priceRange !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-cyan-400 flex items-center gap-1 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-500">
        Hiển thị <strong className="text-slate-900">{filteredProducts.length}</strong> sản phẩm phù hợp
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-500 mx-auto border border-slate-200">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Không có giải pháp nào khớp với bộ lọc tìm kiếm hiện tại. Hãy thử thay đổi từ khóa hoặc thiết lập lại bộ lọc.
          </p>
          <Button size="sm" variant="outline" onClick={handleResetFilters}>
            Đặt lại tất cả bộ lọc
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Product Preview Mockup Header */}
              <div className="p-3.5 bg-white border-b border-slate-200">
                <SoftwarePreviewCard
                  type={product.mockupType}
                  previewImage={product.previewImage}
                  name={product.name}
                />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      {product.categoryName}
                    </span>
                    {product.featuredBadge && (
                      <Badge variant={product.badgeVariant || 'primary'} size="sm">
                        {product.featuredBadge}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                    {product.tagline}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {product.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer and Actions */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs text-slate-500">Giá đề xuất demo:</span>
                    <span className="text-base font-extrabold text-slate-900">
                      {product.basePrice > 0
                        ? `${product.basePrice.toLocaleString('vi-VN')} đ`
                        : 'Liên hệ báo giá'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedDemoProduct(product)}
                      icon={<Play className="w-3.5 h-3.5 text-accent" />}
                    >
                      Dùng thử
                    </Button>

                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/products/${product.slug}`)}
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                      iconPosition="right"
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live Demo Modal */}
      <LiveProductDemoModal
        product={selectedDemoProduct}
        isOpen={!!selectedDemoProduct}
        onClose={() => setSelectedDemoProduct(null)}
      />
    </div>
  );
};
