import React, { useState } from 'react';
import { blogService } from '../../services/blogService';
import { BlogPost } from '../../types/blog';
import { Button } from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  StarOff,
  RotateCcw,
  ArrowUpRight,
  Clock,
  Tag,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const AdminPostsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(() => blogService.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [readTime, setReadTime] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const refreshList = () => {
    setBlogs(blogService.getAll());
  };

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('Chuyển đổi số');
    setTagsInput('');
    setAuthorName('');
    setAuthorRole('');
    setAuthorAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
    setPublishedAt(new Date().toISOString().split('T')[0]);
    setReadTime('5 phút đọc');
    setCoverImage('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCategory(blog.category);
    setTagsInput(blog.tags.join(', '));
    setAuthorName(blog.author.name);
    setAuthorRole(blog.author.role);
    setAuthorAvatar(blog.author.avatar);
    setPublishedAt(blog.publishedAt);
    setReadTime(blog.readTime);
    setCoverImage(blog.coverImage);
    setIsModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Vui lòng nhập tiêu đề bài viết');
      return;
    }

    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/g, '-').replace(/^-|-$/g, '');
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingBlog) {
      const updated: BlogPost = {
        ...editingBlog,
        title,
        slug: finalSlug,
        excerpt,
        content,
        category,
        tags,
        author: {
          name: authorName,
          role: authorRole,
          avatar: authorAvatar,
        },
        publishedAt,
        readTime,
        coverImage,
      };
      blogService.save(updated);
      toast.success('Đã cập nhật bài viết thành công');
    } else {
      const newBlog: BlogPost = {
        id: `blog-${Date.now()}`,
        title,
        slug: finalSlug,
        excerpt,
        content,
        category,
        tags,
        author: {
          name: authorName,
          role: authorRole,
          avatar: authorAvatar,
        },
        publishedAt,
        readTime,
        coverImage,
        isFeatured: false,
      };
      blogService.save(newBlog);
      toast.success('Đã thêm bài viết mới thành công');
    }

    setIsModalOpen(false);
    refreshList();
  };

  const handleDelete = (id: string, blogTitle: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${blogTitle}"?`)) {
      blogService.delete(id);
      toast.info(`Đã xóa bài viết "${blogTitle}"`);
      refreshList();
    }
  };

  const handleToggleFeatured = (id: string) => {
    blogService.toggleFeatured(id);
    refreshList();
    toast.success('Đã thay đổi trạng thái nổi bật');
  };

  const handleReset = () => {
    if (window.confirm('Khôi phục danh sách bài viết mẫu ban đầu?')) {
      blogService.resetToDefault();
      refreshList();
      toast.info('Đã khôi phục dữ liệu bài viết mặc định');
    }
  };

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-light" />
            Quản lý Bài viết ({blogs.length})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            CRUD bài viết trực tiếp. Dữ liệu lưu vào localStorage và đồng bộ ngay với website.
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
            Thêm bài viết mới
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
          placeholder="Tìm bài viết theo tiêu đề, chuyên mục, tác giả..."
          className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="p-4">Ảnh bìa</th>
                <th className="p-4">Tiêu đề bài viết</th>
                <th className="p-4">Chuyên mục</th>
                <th className="p-4">Tác giả</th>
                <th className="p-4">Ngày đăng</th>
                <th className="p-4">Nổi bật</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-16 h-10 object-cover rounded-lg border border-slate-200"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm line-clamp-1 max-w-xs">{b.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">{b.excerpt}</div>
                    {b.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {b.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                        {b.tags.length > 3 && (
                          <span className="text-[10px] text-slate-500">+{b.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-accent">{b.category}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={b.author.avatar}
                        alt={b.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-slate-700 font-medium">{b.author.name}</div>
                        <div className="text-[10px] text-slate-500">{b.author.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-600 font-mono">{b.publishedAt}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {b.readTime}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeatured(b.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                        b.isFeatured
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-slate-100 text-slate-500 border border-slate-300'
                      }`}
                    >
                      {b.isFeatured ? <Star className="w-3 h-3" /> : <StarOff className="w-3 h-3" />}
                      <span>{b.isFeatured ? 'Nổi bật' : 'Thường'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        to={`/blog/${b.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-500 hover:bg-slate-100 transition-colors"
                        title="Xem bài viết"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(b)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id, b.title)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-100 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Không tìm thấy bài viết nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Blog Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBlog ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
        subtitle="Nhập thông tin bài viết công nghệ, chuyên mục và tác giả."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveBlog} className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tiêu đề bài viết"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Xu hướng chuyển đổi số 2026"
            />
            <Input
              label="Đường dẫn (Slug)"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="VD: xu-huong-chuyen-doi-so-2026"
            />
          </div>

          <Textarea
            label="Tóm tắt (Excerpt)"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Mô tả ngắn gọn về nội dung bài viết..."
          />

          <Textarea
            label="Nội dung bài viết (Markdown)"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nội dung chi tiết bài viết, hỗ trợ Markdown..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Chuyên mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-background/80 border border-border rounded-xl px-3.5 py-2.5 text-xs text-text-main focus:outline-none focus:border-primary"
              >
                <option value="Chuyển đổi số">Chuyển đổi số</option>
                <option value="Công nghệ phần mềm">Công nghệ phần mềm</option>
                <option value="Xây dựng website">Xây dựng website</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Bảo mật">Bảo mật</option>
                <option value="Tin tức 2HT">Tin tức 2HT</option>
              </select>
            </div>
            <Input
              label="Tags (phân cách bằng dấu phẩy)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, Spring Boot, Docker..."
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-cyan-500" /> Thông tin tác giả
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Tên tác giả"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="VD: Nguyễn Huy Hoàng"
              />
              <Input
                label="Chức vụ"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="VD: Chief Technology Officer"
              />
            </div>
            <Input
              label="URL Avatar tác giả"
              value={authorAvatar}
              onChange={(e) => setAuthorAvatar(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Ngày đăng"
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
            />
            <Input
              label="Thời gian đọc"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="VD: 5 phút đọc"
            />
          </div>

          <Input
            label="URL Ảnh bìa (Cover Image)"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://images.unsplash.com/..."
          />
          {coverImage && (
            <img
              src={coverImage}
              alt="Preview"
              className="w-full h-32 object-cover rounded-xl border border-slate-200"
            />
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <Button size="md" variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Hủy bỏ
            </Button>
            <Button size="md" variant="primary" type="submit">
              {editingBlog ? 'Lưu thay đổi' : 'Tạo bài viết'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
