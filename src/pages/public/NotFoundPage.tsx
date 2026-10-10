import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-accent font-mono">
        404
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Trang không tồn tại</h1>
      <p className="text-slate-600 text-sm">
        Đường dẫn bạn yêu cầu không tồn tại hoặc đã được thay đổi trong hệ thống 2HT.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Button variant="outline" size="md" onClick={() => navigate(-1)} icon={<ArrowLeft className="w-4 h-4" />}>
          Quay lại
        </Button>
        <Button variant="primary" size="md" onClick={() => navigate('/')} icon={<Home className="w-4 h-4" />}>
          Trang chủ
        </Button>
      </div>
    </div>
  );
};
