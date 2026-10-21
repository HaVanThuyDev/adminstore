import React, { useState, useEffect, useRef } from 'react';
import { productService } from '../../services/productService';
import { apiClient } from '../../services/apiClient';
import { Product, ProductCategory } from '../../types/product';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  RotateCcw,
  Sparkles,
  Check,
  UploadCloud,
  Image as ImageIcon,
  X,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => productService.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<ProductCategory>('ecommerce');
  const [basePrice, setBasePrice] = useState<number>(15000000);
  const [description, setDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState('React, Spring Boot, MySQL, Docker');
  const [featuredBadge, setFeaturedBadge] = useState('Mới ra mắt');
  const [previewImage, setPreviewImage] = useState('');
  const [dataSourceId, setDataSourceId] = useState<number | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshList = async () => {
    const list = await productService.fetchAll();
    setProducts(list);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn tệp định dạng hình ảnh (.jpg, .png, .webp,...)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Kích thước ảnh tối đa là 10MB');
      return;
    }

    setSelectedFile(file);
    // Hiển thị xem trước ảnh ngay lập tức bằng Object URL cục bộ
    const localUrl = URL.createObjectURL(file);
    setPreviewImage(localUrl);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage('');
    setDataSourceId(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName('');
    setSlug('');
    setTagline('');
    setCategory('ecommerce');
    setBasePrice(15000000);
    setDescription('');
    setTechStackInput('React, Spring Boot, MySQL, Docker');
    setFeaturedBadge('Mới ra mắt');
    setSelectedFile(null);
    setPreviewImage('');
    setDataSourceId(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setSlug(prod.slug);
    setTagline(prod.tagline);
    setCategory(prod.category);
    setBasePrice(prod.basePrice);
    setDescription(prod.description);
    setTechStackInput(prod.techStack.join(', '));
    setFeaturedBadge(prod.featuredBadge || '');
    setSelectedFile(null);
    setPreviewImage(prod.previewImage || '');
    setDataSourceId(prod.dataSourceId);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Vui lòng nhập tên sản phẩm');
      return;
    }

    setIsSaving(true);

    let finalDataSourceId = dataSourceId;
    let finalPreviewImage = previewImage;

    // Khi người dùng bấm lưu, nếu có chọn file ảnh mới thì mới upload lên Cloudinary & lưu data_souses
    if (selectedFile) {
      const uploadToast = toast.loading('Đang xử lý tải ảnh lên hệ thống...');
      try {
        const res = await apiClient.uploadFile<{ id: number; cloudinaryUrl: string; fileName: string }>(
          '/data-sources/upload',
          selectedFile
        );
        if (res?.id) {
          finalDataSourceId = res.id;
          finalPreviewImage = res.cloudinaryUrl;
          toast.dismiss(uploadToast);
        }
      } catch (err: any) {
        toast.error('Lỗi tải ảnh lên: ' + (err.message || 'Lỗi kết nối'), { id: uploadToast });
        setIsSaving(false);
        return;
      }
    }

    const finalSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const techs = techStackInput.split(',').map((t) => t.trim()).filter(Boolean);

    const categoryNames: Record<ProductCategory, string> = {
      ecommerce: 'Thương mại điện tử',
      management: 'Phần mềm quản lý',
      website: 'Website',
      finance: 'Tài chính',
      hrm: 'Nhân sự',
      custom: 'Giải pháp theo yêu cầu',
    };

    try {
      if (editingProduct) {
        const updated: Product = {
          ...editingProduct,
          name,
          slug: finalSlug,
          tagline,
          category,
          categoryName: categoryNames[category],
          basePrice,
          description,
          techStack: techs,
          featuredBadge: featuredBadge.trim() || undefined,
          previewImage: finalPreviewImage.startsWith('blob:') ? undefined : (finalPreviewImage || undefined),
          dataSourceId: finalDataSourceId || undefined,
        };
        await productService.save(updated);
        toast.success('Đã cập nhật thông tin sản phẩm');
      } else {
        const newProd: Product = {
          id: `prod-${Date.now()}`,
          name,
          slug: finalSlug,
          tagline,
          category,
          categoryName: categoryNames[category],
          description,
          longDescription: description,
          basePrice,
          techStack: techs,
          featuredBadge: featuredBadge.trim() || undefined,
          previewImage: finalPreviewImage.startsWith('blob:') ? undefined : (finalPreviewImage || undefined),
          dataSourceId: finalDataSourceId || undefined,
          hasLiveDemo: true,
          mockupType: (category === 'ecommerce' ? 'ecommerce' : category === 'hrm' ? 'hrm' : 'business') as any,
          screenshots: [],
          features: [
            { title: 'Tính năng tiêu chuẩn 2HT', description: 'Được thiết kế tối ưu hiệu năng.', iconName: 'Zap' },
          ],
          plans: [
            { id: 'plan-def', name: 'Gói Tiêu Chuẩn', price: basePrice, billingCycle: 'vĩnh viễn', description: 'Gói tiêu chuẩn.', features: ['Bảo hành 12 tháng'] },
          ],
          faqs: [],
          isPublished: true,
          rating: 5.0,
          reviewsCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await productService.save(newProd);
        toast.success('Đã thêm sản phẩm mới vào danh mục 2HT');
      }

      setIsModalOpen(false);
      await refreshList();
    } catch (err: any) {
      toast.error('Lỗi lưu sản phẩm: ' + (err.message || 'Lỗi server'));
    } finally {
      setIsSaving(false);
    }
  };


  const handleDelete = async (id: string, prodName: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${prodName}" khỏi hệ thống?`)) {
      await productService.delete(id);
      toast.info(`Đã xóa sản phẩm "${prodName}"`);
      await refreshList();
    }
  };

  const handleTogglePublish = async (id: string) => {
    await productService.togglePublish(id);
    await refreshList();
    toast.success('Đã thay đổi trạng thái xuất bản sản phẩm');
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục danh sách sản phẩm mẫu ban đầu của 2HT?')) {
      productService.resetToDefault();
      refreshList();
      toast.info('Đã khôi phục dữ liệu sản phẩm mặc định');
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-primary-light" />
            Quản lý Sản phẩm phần mềm ({products.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            CRUD sản phẩm trực tiếp. Dữ liệu lưu vào localStorage và đồng bộ ngay với website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Khôi phục mẫu
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleOpenAdd}
            icon={<Plus className="w-4 h-4" />}
          >
            Thêm sản phẩm mới
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm sản phẩm theo tên hoặc danh mục..."
          className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="p-4">Tên sản phẩm</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Giá đề xuất</th>
                <th className="p-4">Công nghệ</th>
                <th className="p-4">Xuất bản</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.previewImage ? (
                        <img
                          src={p.previewImage}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50 shadow-xs"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate max-w-xs">{p.name}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{p.tagline}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          {p.featuredBadge && (
                            <span className="inline-block text-[10px] bg-primary/20 text-primary-light px-2 py-0.5 rounded font-medium">
                              {p.featuredBadge}
                            </span>
                          )}
                          {p.dataSourceId && (
                            <span className="inline-block text-[9px] font-mono bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200">
                              Media #{p.dataSourceId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600 font-medium">{p.categoryName}</span>
                  </td>
                  <td className="p-4 font-bold text-accent">
                    {p.basePrice > 0 ? `${p.basePrice.toLocaleString('vi-VN')} đ` : 'Báo giá'}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {p.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          {t}
                        </span>
                      ))}
                      {p.techStack.length > 3 && (
                        <span className="text-[10px] text-slate-500">+{p.techStack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleTogglePublish(p.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                        p.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-100 text-slate-500 border border-slate-300'
                      }`}
                    >
                      {p.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{p.isPublished ? 'Đang hiện' : 'Đã ẩn'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-100 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Chỉnh sửa sản phẩm 2HT' : 'Thêm sản phẩm phần mềm mới'}
        subtitle="Cập nhật thông tin giải pháp, công nghệ và giá bán demo."
        maxWidth="xl"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tên sản phẩm"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: 2HT Logistics"
            />
            <Input
              label="Đường dẫn (Slug)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="VD: 2ht-logistics"
            />
          </div>

          <Input
            label="Khẩu hiệu ngắn (Tagline)"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="VD: Hệ thống điều phối kho vận & vận chuyển thông minh"
          />

          {/* Nhập ảnh */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Nhập ảnh
            </label>

            <div className="border-2 border-dashed border-slate-200 hover:border-primary/50 transition-colors rounded-xl p-3 bg-slate-50/50">
              {previewImage ? (
                <div className="relative group w-full h-40 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-slate-200">
                  <img
                    src={previewImage}
                    alt="Xem trước ảnh"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/90 text-slate-700 px-2.5 py-1 rounded-lg shadow-md hover:bg-white text-xs font-medium border border-slate-200"
                    >
                      Đổi ảnh
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-rose-500 text-white p-1.5 rounded-lg shadow-md hover:bg-rose-600 transition-colors"
                      title="Xóa ảnh"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center py-6 cursor-pointer text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-medium text-slate-600">
                    Nhấp để chọn ảnh
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Danh mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-background/80 border border-border rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:border-primary"
              >
                <option value="ecommerce">Thương mại điện tử</option>
                <option value="management">Phần mềm quản lý</option>
                <option value="finance">Tài chính</option>
                <option value="hrm">Nhân sự HRM</option>
                <option value="custom">Giải pháp theo yêu cầu</option>
                <option value="website">Website Doanh nghiệp</option>
              </select>
            </div>

           <Input
  label="Giá đề xuất demo (VNĐ)"
  type="text"
  placeholder="Nhập giá tiền, VD: 9.000.000 (0 là Báo giá)"
  value={basePrice ? Number(basePrice).toLocaleString('vi-VN') : ''}
  onChange={(e) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    setBasePrice(rawVal ? Number(rawVal) : 0);
  }}
/>
          </div>

          <Input
            label="Công nghệ phát triển (phân cách bằng dấu phẩy)"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            placeholder="React, Spring Boot, MySQL, Docker..."
          />

          <Input
            label="Huy hiệu nổi bật (Badge)"
            value={featuredBadge}
            onChange={(e) => setFeaturedBadge(e.target.value)}
            placeholder="VD: Sản phẩm mới, Bán chạy..."
          />

          <Textarea
            label="Mô tả tóm tắt giải pháp"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả chức năng và giá trị mang lại cho doanh nghiệp..."
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button size="md" variant="outline" type="button" onClick={() => setIsModalOpen(false)} disabled={isSaving}>
              Hủy bỏ
            </Button>
            <Button size="md" variant="primary" type="submit" disabled={isSaving}>
              {isSaving ? 'Đang lưu...' : (editingProduct ? 'Lưu thay đổi' : 'Tạo sản phẩm')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
