import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { productService } from '../../services/productService';
import { initialProjects } from '../../data/initialProjects';
import { initialBlogs } from '../../data/initialBlogs';
import { Search, Package, Layers, BookOpen, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const products = productService.getPublished();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open search
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const filteredProjects = query.trim()
    ? initialProjects.filter(
        (pr) =>
          pr.title.toLowerCase().includes(query.toLowerCase()) ||
          pr.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredBlogs = query.trim()
    ? initialBlogs.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (url: string) => {
    onClose();
    setQuery('');
    navigate(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm sản phẩm, dự án, bài viết hoặc công nghệ (VD: E-Commerce, React)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-colors"
          />
        </div>

        {query.trim() === '' ? (
          <div className="py-6 text-center text-xs text-slate-500">
            <p>Nhập từ khóa để tìm kiếm nhanh trong toàn bộ hệ sinh thái 2HT.</p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-[11px] text-slate-400">Gợi ý tìm kiếm:</span>
              {['E-Commerce', 'Residence', 'HRM', 'Spring Boot', 'Docker'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 hover:text-primary hover:bg-slate-200 border border-slate-200 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
            {filteredProducts.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-primary" /> Sản phẩm ({filteredProducts.length})
                </div>
                <div className="space-y-1.5">
                  {filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(`/products/${p.slug}`)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-primary/5 border border-slate-200/80 hover:border-primary/40 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-primary">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{p.tagline}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredProjects.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" /> Dự án tiêu biểu ({filteredProjects.length})
                </div>
                <div className="space-y-1.5">
                  {filteredProjects.map((pr) => (
                    <button
                      key={pr.id}
                      onClick={() => handleSelect(`/projects/${pr.slug}`)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-primary/5 border border-slate-200/80 hover:border-primary/40 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-primary">
                          {pr.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{pr.subtitle}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredBlogs.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Bài viết công nghệ ({filteredBlogs.length})
                </div>
                <div className="space-y-1.5">
                  {filteredBlogs.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleSelect(`/blog/${b.slug}`)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-500/40 flex items-center justify-between transition-all group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                          {b.title}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{b.excerpt}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredProducts.length === 0 && filteredProjects.length === 0 && filteredBlogs.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-500">
                Không tìm thấy kết quả nào phù hợp với "{query}".
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
