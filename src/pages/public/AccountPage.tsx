import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authContext';
import { orderService } from '../../services/orderService';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { DemoNoticeBadge } from '../../components/common/DemoNoticeBadge';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  ShoppingBag, 
  LogOut, 
  Calendar, 
  Edit3, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { DemoOrder } from '../../types/order';

export const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logoutDemo, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.fullName || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editCompany, setEditCompany] = useState(user?.company || '');

  const orders = orderService.getAll();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">BÃ¡ÂºÂ¡n chÃ†Â°a Ã„â€˜Ã„Æ’ng nhÃ¡ÂºÂ­p</h2>
        <p className="text-xs text-slate-500">
          Vui lÃƒÂ²ng Ã„â€˜Ã„Æ’ng nhÃ¡ÂºÂ­p hoÃ¡ÂºÂ·c chÃ¡Â»Ân chÃ¡ÂºÂ¿ Ã„â€˜Ã¡Â»â„¢ khÃƒÂ¡ch hÃƒÂ ng thÃ¡Â»Â­ nghiÃ¡Â»â€¡m Ã„â€˜Ã¡Â»Æ’ vÃƒÂ o trang tÃƒÂ i khoÃ¡ÂºÂ£n.
        </p>
        <Button variant="primary" onClick={() => navigate('/login')}>
          Ã„ÂÃ¡ÂºÂ¿n trang Ã„â€˜Ã„Æ’ng nhÃ¡ÂºÂ­p
        </Button>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: editName,
      phone: editPhone,
      company: editCompany,
    });
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DEMO_COMPLETED':
        return <Badge variant="success" size="sm">Ã„ÂÃƒÂ£ duyÃ¡Â»â€¡t (Demo)</Badge>;
      case 'DEMO_PROCESSING':
        return <Badge variant="accent" size="sm">Ã„Âang xÃ¡Â»Â­ lÃƒÂ½ (Demo)</Badge>;
      case 'DEMO_CANCELLED':
        return <Badge variant="warning" size="sm">Ã„ÂÃƒÂ£ hÃ¡Â»Â§y (Demo)</Badge>;
      default:
        return <Badge variant="neutral" size="sm">ChÃ¡Â»Â duyÃ¡Â»â€¡t (DEMO_PENDING)</Badge>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-primary transition-colors">
          Trang chÃ¡Â»Â§
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        <span className="text-slate-900 font-medium">TÃƒÂ i khoÃ¡ÂºÂ£n & Ã„ÂÃ†Â¡n hÃƒÂ ng</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900">HÃ¡Â»â€œ sÃ†Â¡ khÃƒÂ¡ch hÃƒÂ ng Demo</h1>
          <p className="text-xs text-slate-500 mt-1">
            QuÃ¡ÂºÂ£n lÃƒÂ½ thÃƒÂ´ng tin doanh nghiÃ¡Â»â€¡p vÃƒÂ  theo dÃƒÂµi lÃ¡Â»â€¹ch sÃ¡Â»Â­ Ã„â€˜Ã†Â¡n Ã„â€˜Ã¡ÂºÂ·t hÃƒÂ ng thÃ¡Â»Â­ nghiÃ¡Â»â€¡m.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            logoutDemo();
            navigate('/');
          }}
          icon={<LogOut className="w-4 h-4" />}
        >
          Ã„ÂÃ„Æ’ng xuÃ¡ÂºÂ¥t
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-accent p-0.5">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={user.fullName}
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{user.fullName}</h3>
              <span className="text-[11px] text-primary font-semibold uppercase">{user.role}</span>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-3 pt-2">
              <Input
                label="HÃ¡Â»Â tÃƒÂªn"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <Input
                label="SÃ¡Â»â€˜ Ã„â€˜iÃ¡Â»â€¡n thoÃ¡ÂºÂ¡i"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
              <Input
                label="CÃƒÂ´ng ty"
                value={editCompany}
                onChange={(e) => setEditCompany(e.target.value)}
              />
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="primary" type="submit" fullWidth>
                  LÃ†Â°u
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  fullWidth
                  onClick={() => setIsEditing(false)}
                >
                  HÃ¡Â»Â§y
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>{user.phone || 'ChÃ†Â°a cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-500" />
                <span>{user.company || 'Doanh nghiÃ¡Â»â€¡p thÃ¡Â»Â­ nghiÃ¡Â»â€¡m'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>NgÃƒÂ y tham gia: {user.joinedDate}</span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Button
                  size="sm"
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setEditName(user.fullName);
                    setEditPhone(user.phone);
                    setEditCompany(user.company || '');
                    setIsEditing(true);
                  }}
                  icon={<Edit3 className="w-3.5 h-3.5" />}
                >
                  ChÃ¡Â»â€°nh sÃ¡Â»Â­a thÃƒÂ´ng tin
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-slate-900">LÃ¡Â»â€¹ch sÃ¡Â»Â­ Ã„â€˜Ã†Â¡n hÃƒÂ ng thÃ¡Â»Â­ nghiÃ¡Â»â€¡m ({orders.length})</h3>
            </div>
            <Link to="/products" className="text-xs text-primary font-medium hover:underline">
              + Ã„ÂÃ¡ÂºÂ·t giÃ¡ÂºÂ£i phÃƒÂ¡p mÃ¡Â»â€ºi
            </Link>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500">
                BÃ¡ÂºÂ¡n chÃ†Â°a cÃƒÂ³ Ã„â€˜Ã†Â¡n hÃƒÂ ng demo nÃƒÂ o. HÃƒÂ£y thÃ¡Â»Â­ chÃ¡Â»Ân sÃ¡ÂºÂ£n phÃ¡ÂºÂ©m vÃƒÂ  thanh toÃƒÂ¡n Ã„â€˜Ã¡Â»Æ’ xem dÃ¡Â»Â¯ liÃ¡Â»â€¡u tÃ¡ÂºÂ¡i Ã„â€˜ÃƒÂ¢y.
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-xs">{ord.id}</span>
                      <span className="text-[11px] text-slate-500">Ã¢â‚¬Â¢ {new Date(ord.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div>{getStatusBadge(ord.status)}</div>
                  </div>

                  <div className="space-y-1 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700">
                        <span>{it.productName} (x{it.quantity})</span>
                        <span className="font-mono font-medium">{it.price > 0 ? `${(it.price * it.quantity).toLocaleString('vi-VN')} Ã„â€˜` : 'BÃƒÂ¡o giÃƒÂ¡'}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-xs">
                    <span className="text-slate-500">TÃ¡Â»â€¢ng thanh toÃƒÂ¡n:</span>
                    <span className="font-bold text-primary text-sm">{ord.total.toLocaleString('vi-VN')} Ã„â€˜</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
