import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { initialProjects } from '../../data/initialProjects';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium">Dự án tiêu biểu</span>
      </div>

      <SectionHeading
        eyebrow="Case Studies & Triển khai"
        title="Các dự án chuyển đổi số thành công."
        description="Khám phá các case study thực tế thể hiện năng lực giải quyết bài toán nghiệp vụ phức tạp của 2HT Information Technology."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/projects/${project.slug}`)}
            className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group flex flex-col shadow-sm"
          >
            <div className="h-56 overflow-hidden relative">
              <img
                src={project.featuredImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 text-xs font-semibold bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-primary border border-slate-200">
                {project.industry}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-mono text-slate-500 block mb-1">
                  Năm {project.completionYear} • {project.clientType}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{project.subtitle}</p>
                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-primary font-semibold">
                <span>Xem case study đầy đủ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
