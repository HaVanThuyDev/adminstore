import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { initialProjects } from '../../data/initialProjects';
import { Button } from '../../components/common/Button';
import { ChevronRight, CheckCircle2, Calendar, Building } from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = initialProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy dự án</h2>
        <Button variant="primary" onClick={() => navigate('/projects')}>
          Quay lại danh sách dự án
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <Link to="/projects" className="hover:text-primary transition-colors">
          Dự án
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium truncate">{project.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          {project.industry}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg text-slate-600 font-medium">{project.subtitle}</p>

        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-500 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-primary" />
            <span>Khách hàng: <strong className="text-slate-900">{project.clientType}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Năm hoàn thành: <strong className="text-slate-900">{project.completionYear}</strong></span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl h-80 sm:h-96">
        <img
          src={project.featuredImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {project.metrics.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="text-2xl sm:text-3xl font-black text-primary">{m.value}</div>
            <div className="text-xs text-slate-500 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Deep-dive Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Thách thức đặt ra</h2>
            <p className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-slate-600">
              {project.challenge}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Giải pháp công nghệ từ 2HT</h2>
            <p className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-slate-600">
              {project.solution}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Kết quả đo lường thực tế</h2>
            <div className="space-y-2">
              {project.result.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Công nghệ ứng dụng
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-primary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs text-slate-500 block">Bạn có bài toán tương tự?</span>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => navigate('/contact')}
              >
                Liên hệ tư vấn giải pháp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
