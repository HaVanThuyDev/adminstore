import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '../services/storage';
import { toast } from 'sonner';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  role: 'user' | 'admin';
  avatar?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginDemo: (email: string, role?: 'user' | 'admin') => boolean;
  registerDemo: (data: { fullName: string; email: string; phone: string; company?: string }) => boolean;
  logoutDemo: () => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-01',
  fullName: 'Doanh Nghiệp Demo',
  email: 'khachhang@demo.vn',
  phone: '0909 888 999',
  company: 'Demo Technology Corp',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  joinedDate: '2026-01-10',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    return storage.get<UserProfile | null>(STORAGE_KEYS.AUTH, DEFAULT_DEMO_USER);
  });

  useEffect(() => {
    storage.set(STORAGE_KEYS.AUTH, user);
  }, [user]);

  const loginDemo = (email: string, role: 'user' | 'admin' = 'user') => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: role === 'admin' ? 'Quản Trị Viên 2HT' : (email.split('@')[0] || 'Khách Hàng Demo'),
      email: email.trim(),
      phone: '0988 123 456',
      company: role === 'admin' ? '2HT Information Technology' : 'Công ty Cổ phần Thử nghiệm',
      role: role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    toast.success(`Đăng nhập chế độ Demo thành công (${role.toUpperCase()})`, {
      description: 'Lưu ý: Đây là tài khoản mô phỏng trên trình duyệt, không có database thực.',
    });
    return true;
  };

  const registerDemo = (data: { fullName: string; email: string; phone: string; company?: string }) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      company: data.company || 'Doanh nghiệp thử nghiệm',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
    toast.success('Đăng ký tài khoản Demo thành công!', {
      description: 'Dữ liệu được lưu trong trình duyệt của bạn.',
    });
    return true;
  };

  const logoutDemo = () => {
    setUser(null);
    toast.info('Đã đăng xuất tài khoản demo');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updated };
    setUser(updatedUser);
    toast.success('Đã cập nhật thông tin tài khoản');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loginDemo,
        registerDemo,
        logoutDemo,
        logout: logoutDemo,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
