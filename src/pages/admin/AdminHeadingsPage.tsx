import React, { useState, useEffect } from 'react';
import { headingService } from '../../services/headingService';
import { SiteHeading } from '../../types/heading';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import {
  Type,
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  Save,
  Filter,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminHeadingsPage: React.FC = () => {
  const [headings, setHeadings] = useState<SiteHeading[]>(() => headingService.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPage, setFilterPage] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHeading, setEditingHeading] = useState<SiteHeading | null>(null);

  // Inline editing state
  const [editingInlineId, setEditingInlineId] = useState<string | null>(null);
  const [inlineValue, setInlineValue] = useState('');

  // Form State for modal
  const [key, setKey] = useState('');
  const [section, setSection] = useState('');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<SiteHeading['type']>('heading');
  const [page, setPage] = useState('Trang chủ');

  const refreshList = async () => {
    const list = await headingService.fetchAll();
    setHeadings(list);
  };

  useEffect(() => {
    refreshList();
  }, []);

  // Get unique pages for filter
  const uniquePages = Array.from(new Set(headings.map((h) => h.page)));

  const handleOpenAdd = () => {
    setEditingHeading(null);
    setKey('');
    setSection('');
    setLabel('');
    setValue('');
    setType('heading');
    setPage('Trang chủ');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (heading: SiteHeading) => {
    setEditingHeading(heading);
    setKey(heading.key);
    setSection(heading.section);
    setLabel(heading.label);
    setValue(heading.value);
    setType(heading.type);
    setPage(heading.page);
    setIsModalOpen(true);
  };

  const handleSaveHeading = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim() || !value.trim()) {
      toast.error('Vui lòng nhập đầy đủ Key và Nội dung tiêu đề');
      return;
    }

    if (editingHeading) {
      const updated: SiteHeading = {
        ...editingHeading,
        key,
        section,
        label,
        value,
        type,
        page,
      };
      await headingService.save(updated);
      toast.success('Đã cập nhật tiêu đề thành công');
    } else {
      const newHeading: SiteHeading = {
        id: `heading-${Date.now()}`,
        key,
        section,
        label,
        value,
        type,
        page,
      };
      await headingService.save(newHeading);
      toast.success('Đã thêm tiêu đề mới thành công');
    }

    setIsModalOpen(false);
    await refreshList();
  };

  const handleInlineSave = async (id: string) => {
    if (inlineValue.trim()) {
      await headingService.updateValue(id, inlineValue);
      toast.success('Đã cập nhật nội dung tiêu đề');
      await refreshList();
    }
    setEditingInlineId(null);
  };

  const handleDelete = async (id: string, headingLabel: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tiêu đề "${headingLabel}"?`)) {
      await headingService.delete(id);
      toast.info(`Đã xóa tiêu đề "${headingLabel}"`);
      await refreshList();
    }
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục danh sách tiêu đề mặc định?')) {
      headingService.resetToDefault();
      refreshList();
      toast.info('Đã khôi phục dữ liệu tiêu đề mặc định');
    }
  };

  const filtered = headings.filter((h) => {
    const matchesSearch =
      h.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage = filterPage === 'all' || h.page === filterPage;
    return matchesSearch && matchesPage;
  });

  // Group by section for better display
  const groupedBySection: Record<string, SiteHeading[]> = {};
  filtered.forEach((h) => {
    const key = `${h.page} — ${h.section}`;
    if (!groupedBySection[key]) groupedBySection[key] = [];
    groupedBySection[key].push(h);
  });

  const getTypeBadge = (t: SiteHeading['type']) => {
    const styles: Record<string, string> = {
      heading: 'bg-blue-100 text-blue-700 border-blue-200',
      subheading: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      eyebrow: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      description: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    const labels: Record<string, string> = {
      heading: 'Tiêu đề',
      subheading: 'Phụ đề',
      eyebrow: 'Eyebrow',
      description: 'Mô tả',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[t]}`}>
        {labels[t]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Type className="w-6 h-6 text-primary-light" />
            Quản lý Tiêu đề Website ({headings.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Chỉnh sửa trực tiếp các tiêu đề, mô tả hiển thị trên toàn bộ website. Thay đổi lưu vào localStorage.
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
            Thêm tiêu đề mới
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm tiêu đề theo tên, key hoặc nội dung..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={filterPage}
            onChange={(e) => setFilterPage(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-primary"
          >
            <option value="all">Tất cả trang</option>
            {uniquePages.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Headings Grouped by Section */}
      <div className="space-y-6">
        {Object.entries(groupedBySection).map(([sectionKey, items]) => (
          <div key={sectionKey} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            {/* Section Header */}
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-500" />
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{sectionKey}</h3>
              <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                {items.length} mục
              </span>
            </div>

            {/* Items */}
            <div className="divide-y divide-slate-100">
              {items.map((h) => (
                <div key={h.id} className="px-5 py-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{h.label}</span>
                        {getTypeBadge(h.type)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">key: {h.key}</div>

                      {editingInlineId === h.id ? (
                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="text"
                            value={inlineValue}
                            onChange={(e) => setInlineValue(e.target.value)}
                            className="flex-1 bg-white border border-cyan-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleInlineSave(h.id);
                              if (e.key === 'Escape') setEditingInlineId(null);
                            }}
                          />
                          <button
                            onClick={() => handleInlineSave(h.id)}
                            className="p-1.5 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors"
                            title="Lưu"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <p
                          className="text-sm text-slate-700 font-medium cursor-pointer hover:text-cyan-600 transition-colors"
                          onClick={() => {
                            setEditingInlineId(h.id);
                            setInlineValue(h.value);
                          }}
                          title="Click để sửa nhanh"
                        >
                          "{h.value}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleOpenEdit(h)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Chỉnh sửa chi tiết"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(h.id, h.label)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-100 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedBySection).length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
            Không tìm thấy tiêu đề nào phù hợp.
          </div>
        )}
      </div>

      {/* Add / Edit Heading Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingHeading ? 'Chỉnh sửa tiêu đề' : 'Thêm tiêu đề mới'}
        subtitle="Nhập thông tin tiêu đề, key định danh và trang hiển thị."
        maxWidth="xl"
      >
        <form onSubmit={handleSaveHeading} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Key định danh (unique)"
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="VD: home_hero_title"
            />
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Trang hiển thị
              </label>
              <select
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full bg-background/80 border border-border rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:border-primary"
              >
                <option value="Trang chủ">Trang chủ</option>
                <option value="Sản phẩm">Sản phẩm</option>
                <option value="Blog">Blog</option>
                <option value="Liên hệ">Liên hệ</option>
                <option value="Giới thiệu">Giới thiệu</option>
                <option value="Dịch vụ">Dịch vụ</option>
                <option value="Dự án">Dự án</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Section / Khu vực"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              placeholder="VD: Hero Banner, Sản phẩm nổi bật"
            />
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Loại
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as SiteHeading['type'])}
                className="w-full bg-background/80 border border-border rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:border-primary"
              >
                <option value="heading">Tiêu đề (Heading)</option>
                <option value="subheading">Phụ đề (Subheading)</option>
                <option value="eyebrow">Eyebrow</option>
                <option value="description">Mô tả (Description)</option>
              </select>
            </div>
          </div>

          <Input
            label="Nhãn hiển thị (Label cho admin)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="VD: Tiêu đề chính trang chủ"
          />

          <Textarea
            label="Nội dung tiêu đề"
            required
            rows={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Nhập nội dung tiêu đề hiển thị trên website..."
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button size="md" variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Hủy bỏ
            </Button>
            <Button size="md" variant="primary" type="submit">
              {editingHeading ? 'Lưu thay đổi' : 'Tạo tiêu đề'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
