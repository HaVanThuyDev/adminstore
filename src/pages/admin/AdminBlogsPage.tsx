import React, { useState } from 'react';
import { initialBlogs } from '../../data/initialBlogs';
import { BlogPost } from '../../types/blog';
import { FileText, Search, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminBlogsPage: React.FC = () => {
  const [blogs] = useState<BlogPost[]>(initialBlogs);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary-light" />
          Quản lý Bài viết Công nghệ ({blogs.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Danh sách bài viết chuyên môn và định hướng chuyển đổi số của 2HT.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm bài viết theo tiêu đề..."
          className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-primary"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="p-4">Tiêu đề bài viết</th>
                <th className="p-4">Chuyên mục</th>
                <th className="p-4">Tác giả</th>
                <th className="p-4">Thời gian đọc</th>
                <th className="p-4 text-right">Xem bài</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm line-clamp-1">{b.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{b.excerpt}</div>
                  </td>
                  <td className="p-4 font-medium text-accent">{b.category}</td>
                  <td className="p-4 text-slate-600">{b.author.name}</td>
                  <td className="p-4 text-slate-500 font-mono">{b.readTime}</td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/blog/${b.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-primary-light hover:underline font-semibold"
                    >
                      Xem <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
