import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { initialBlogs } from '../../data/initialBlogs';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Clock, ArrowRight, ChevronRight, Search } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const filtered = initialBlogs.filter((b) => {
    if (selectedTag !== 'all' && !b.tags.includes(selectedTag)) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-primary transition-colors">
          Trang chá»§
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium">GÃ³c nhÃ¬n cÃ´ng nghá»‡</span>
      </div>

      <SectionHeading
        eyebrow="2HT Insights & Engineering"
        title="Kiáº¿n thá»©c chuyá»ƒn Ä‘á»•i sá»‘ & cÃ´ng nghá»‡."
        description="Chia sáº» kinh nghiá»‡m thá»±c chiáº¿n tá»« Ä‘á»™i ngÅ© ká»¹ sÆ° pháº§n má»m vÃ  kiáº¿n trÃºc sÆ° giáº£i phÃ¡p cá»§a 2HT."
      />

      {/* Search & Tag Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="TÃ¬m bÃ i viáº¿t..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'React', 'Spring Boot', 'ERP', 'SEO', 'Microservices'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedTag === t
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {t === 'all' ? 'Táº¥t cáº£' : t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((b) => (
          <div
            key={b.id}
            onClick={() => navigate(`/blog/${b.slug}`)}
            className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group flex flex-col shadow-sm"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={b.coverImage}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[10px] font-semibold bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-primary border border-slate-200">
                {b.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                  <Clock className="w-3 h-3" />
                  <span>{b.readTime}</span>
                  <span>â€¢</span>
                  <span>{b.publishedAt}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {b.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <img
                    src={b.author.avatar}
                    alt={b.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="truncate max-w-[120px] font-medium text-slate-700">{b.author.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
