import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { BlogPost } from '../../types/blog';
import { Button } from '../../components/common/Button';
import { ChevronRight, Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<BlogPost | undefined>(() => (slug ? blogService.getBySlug(slug) : undefined));

  useEffect(() => {
    if (!slug) return;
    blogService.fetchAll().then((list) => {
      const found = list.find((b) => b.slug === slug);
      if (found) setBlog(found);
    });
  }, [slug]);

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">KhÃƒÂ´ng tÃƒÂ¬m thÃ¡ÂºÂ¥y bÃƒÂ i viÃ¡ÂºÂ¿t</h2>
        <Button variant="primary" onClick={() => navigate('/blog')}>
          Quay lÃ¡ÂºÂ¡i danh sÃƒÂ¡ch bÃƒÂ i viÃ¡ÂºÂ¿t
        </Button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Ã„ÂÃƒÂ£ sao chÃƒÂ©p liÃƒÂªn kÃ¡ÂºÂ¿t bÃƒÂ i viÃ¡ÂºÂ¿t!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-primary transition-colors">
          Trang chÃ¡Â»Â§
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <Link to="/blog" className="hover:text-primary transition-colors">
          Blog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium truncate">{blog.title}</span>
      </div>

      <div className="space-y-4">
        <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {blog.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between border-y border-slate-200 py-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-bold text-slate-900 text-sm">{blog.author.name}</div>
              <div>{blog.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{blog.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
              title="Chia sÃ¡ÂºÂ»"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl h-80 sm:h-96">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      <div className="prose max-w-none text-slate-700 space-y-6 leading-relaxed text-base">
        {blog.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-bold text-slate-900 pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n');
            return (
              <ul key={index} className="space-y-2 list-disc pl-5 text-slate-700">
                {listItems.map((item, i) => (
                  <li key={i}>{item.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>

      <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">ChÃ¡Â»Â§ Ã„â€˜Ã¡Â»Â:</span>
          {blog.tags.map((t) => (
            <span
              key={t}
              className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full"
            >
              #{t}
            </span>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/blog')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Quay lÃ¡ÂºÂ¡i danh sÃƒÂ¡ch bÃƒÂ i viÃ¡ÂºÂ¿t
        </Button>
      </div>
    </article>
  );
};
