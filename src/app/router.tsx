import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { PageLoader } from '../components/common/PageLoader';

// HomePage kept eager for instant initial paint
import { HomePage } from '../pages/public/HomePage';

// Lazy Loaded Public Pages
const ProductsPage = lazy(() => import('../pages/public/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('../pages/public/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const CartPage = lazy(() => import('../pages/public/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('../pages/public/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderSuccessPage = lazy(() => import('../pages/public/OrderSuccessPage').then(m => ({ default: m.OrderSuccessPage })));
const SolutionsPage = lazy(() => import('../pages/public/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const ServicesPage = lazy(() => import('../pages/public/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import('../pages/public/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('../pages/public/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const BlogPage = lazy(() => import('../pages/public/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('../pages/public/BlogDetailPage').then(m => ({ default: m.BlogDetailPage })));
const AboutPage = lazy(() => import('../pages/public/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('../pages/public/ContactPage').then(m => ({ default: m.ContactPage })));
const LoginPage = lazy(() => import('../pages/public/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/public/RegisterPage').then(m => ({ default: m.RegisterPage })));
const AccountPage = lazy(() => import('../pages/public/AccountPage').then(m => ({ default: m.AccountPage })));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Lazy Loaded Admin Pages
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminProductsPage = lazy(() => import('../pages/admin/AdminProductsPage').then(m => ({ default: m.AdminProductsPage })));
const AdminOrdersPage = lazy(() => import('../pages/admin/AdminOrdersPage').then(m => ({ default: m.AdminOrdersPage })));
const AdminCustomersPage = lazy(() => import('../pages/admin/AdminCustomersPage').then(m => ({ default: m.AdminCustomersPage })));
const AdminConsultationsPage = lazy(() => import('../pages/admin/AdminConsultationsPage').then(m => ({ default: m.AdminConsultationsPage })));
const AdminBlogsPage = lazy(() => import('../pages/admin/AdminBlogsPage').then(m => ({ default: m.AdminBlogsPage })));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));
const AdminInvoicesPage = lazy(() => import('../pages/admin/AdminInvoicesPage').then(m => ({ default: m.AdminInvoicesPage })));
const AdminContractsPage = lazy(() => import('../pages/admin/AdminContractsPage').then(m => ({ default: m.AdminContractsPage })));
const AdminPostsPage = lazy(() => import('../pages/admin/AdminPostsPage').then(m => ({ default: m.AdminPostsPage })));
const AdminHeadingsPage = lazy(() => import('../pages/admin/AdminHeadingsPage').then(m => ({ default: m.AdminHeadingsPage })));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: withSuspense(NotFoundPage),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: withSuspense(ProductsPage) },
      { path: 'products/:slug', element: withSuspense(ProductDetailPage) },
      { path: 'cart', element: withSuspense(CartPage) },
      { path: 'checkout', element: withSuspense(CheckoutPage) },
      { path: 'order-success/:orderId', element: withSuspense(OrderSuccessPage) },
      { path: 'solutions', element: withSuspense(SolutionsPage) },
      { path: 'services', element: withSuspense(ServicesPage) },
      { path: 'projects', element: withSuspense(ProjectsPage) },
      { path: 'projects/:slug', element: withSuspense(ProjectDetailPage) },
      { path: 'blog', element: withSuspense(BlogPage) },
      { path: 'blog/:slug', element: withSuspense(BlogDetailPage) },
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: 'login', element: withSuspense(LoginPage) },
      { path: 'register', element: withSuspense(RegisterPage) },
      { path: 'account', element: withSuspense(AccountPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },

  // Standalone Internal Admin Login Route
  {
    path: '/admin/login',
    element: withSuspense(AdminLoginPage),
  },

  // Admin Portal Routes
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: withSuspense(AdminDashboardPage) },
      { path: 'products', element: withSuspense(AdminProductsPage) },
      { path: 'orders', element: withSuspense(AdminOrdersPage) },
      { path: 'invoices', element: withSuspense(AdminInvoicesPage) },
      { path: 'contracts', element: withSuspense(AdminContractsPage) },
      { path: 'customers', element: withSuspense(AdminCustomersPage) },
      { path: 'consultations', element: withSuspense(AdminConsultationsPage) },
      { path: 'blogs', element: withSuspense(AdminPostsPage) },
      { path: 'headings', element: withSuspense(AdminHeadingsPage) },
      { path: 'settings', element: withSuspense(AdminSettingsPage) },
    ],
  },
]);
