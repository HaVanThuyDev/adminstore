import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Printer, 
  Send,
  Building,
  User,
  DollarSign,
  Calendar,
  ShieldCheck,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  companyName: string;
  taxCode: string;
  packageName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

const initialInvoices: Invoice[] = [
  {
    id: 'inv-01',
    invoiceNumber: 'HD-2HT-2026-0089',
    customerName: 'Nguyễn Văn Hùng',
    companyName: 'Công ty Cổ phần Bất Động Sản Phúc Khang',
    taxCode: '0314892011',
    packageName: '2HT Residence (Gói Enterprise 24 tháng)',
    amount: 72000000,
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    status: 'PAID',
  },
  {
    id: 'inv-02',
    invoiceNumber: 'HD-2HT-2026-0090',
    customerName: 'Lê Minh Quân',
    companyName: 'Tập đoàn Bán lẻ Nova Retail',
    taxCode: '0108924155',
    packageName: '2HT E-Commerce & Shopee API Connector',
    amount: 45000000,
    issueDate: '2026-10-05',
    dueDate: '2026-10-20',
    status: 'PAID',
  },
  {
    id: 'inv-03',
    invoiceNumber: 'HD-2HT-2026-0091',
    customerName: 'Trần Thu Trang',
    companyName: 'Công ty TNHH Logistics Vận Tải An Phát',
    taxCode: '0317654321',
    packageName: '2HT Business ERP & e-Approval Module',
    amount: 115000000,
    issueDate: '2026-10-08',
    dueDate: '2026-10-22',
    status: 'PENDING',
  },
  {
    id: 'inv-04',
    invoiceNumber: 'HD-2HT-2026-0092',
    customerName: 'Phạm Đức Thành',
    companyName: 'Trung tâm Đào tạo Anh ngữ Everest Global',
    taxCode: '0106789123',
    packageName: '2HT HRM & Chấm công GPS FaceID (Bản quyền 1 năm)',
    amount: 36000000,
    issueDate: '2026-09-25',
    dueDate: '2026-10-05',
    status: 'OVERDUE',
  },
];

export const AdminInvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.companyName.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Đã thanh toán
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Chờ thanh toán
          </span>
        );
      case 'OVERDUE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" /> Quá hạn thanh toán
          </span>
        );
    }
  };

  const handleCreateMockInvoice = () => {
    const newInv: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `HD-2HT-2026-00${invoices.length + 93}`,
      customerName: 'Khách hàng mới (Demo)',
      companyName: 'Công ty Công Nghệ Đối Tác Mới',
      taxCode: '0319998888',
      packageName: 'Bản quyền phần mềm 2HT Suite',
      amount: 50000000,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-10-30',
      status: 'PENDING',
    };
    setInvoices([newInv, ...invoices]);
    toast.success('Đã khởi tạo hóa đơn điện tử demo thành công');
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-cyan-600" /> Quản lý Hóa đơn Điện tử (VAT)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi, xuất hóa đơn điện tử giá trị gia tăng và quản lý trạng thái thanh toán của doanh nghiệp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={handleCreateMockInvoice}
            icon={<Plus className="w-4 h-4" />}
          >
            Tạo hóa đơn mới
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Tìm theo số HĐ, doanh nghiệp, người mua..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Lọc trạng thái:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none"
          >
            <option value="ALL">Tất cả trạng thái ({invoices.length})</option>
            <option value="PAID">Đã thanh toán</option>
            <option value="PENDING">Chờ thanh toán</option>
            <option value="OVERDUE">Quá hạn</option>
          </select>
        </div>
      </div>

      {/* Invoice Table Full Width */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Số hóa đơn</th>
                <th className="py-3.5 px-4">Doanh nghiệp / Khách hàng</th>
                <th className="py-3.5 px-4">Dịch vụ phần mềm</th>
                <th className="py-3.5 px-4 text-right">Tổng tiền (VNĐ)</th>
                <th className="py-3.5 px-4">Ngày phát hành</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-700">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{inv.companyName}</div>
                    <div className="text-[11px] text-slate-500">MST: {inv.taxCode} • Đại diện: {inv.customerName}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {inv.packageName}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 text-sm">
                    {inv.amount.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{inv.issueDate}</div>
                    <div className="text-[10px] text-slate-400">Hạn: {inv.dueDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(inv.status)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-400 hover:bg-cyan-50 transition-colors"
                        title="Xem chi tiết hóa đơn"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toast.info(`Đang tải file PDF cho hóa đơn ${inv.invoiceNumber}...`)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                        title="Tải PDF hóa đơn"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 relative">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600">Hóa đơn điện tử</span>
                <h3 className="text-lg font-black text-slate-900">{selectedInvoice.invoiceNumber}</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Đơn vị mua hàng:</span>
                  <strong className="text-slate-900 text-right">{selectedInvoice.companyName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã số thuế:</span>
                  <span className="font-mono text-slate-800">{selectedInvoice.taxCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Người đại diện:</span>
                  <span className="text-slate-800">{selectedInvoice.customerName}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hạng mục:</span>
                  <strong className="text-slate-900">{selectedInvoice.packageName}</strong>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800">Tổng thanh toán (đã gồm VAT):</span>
                  <span className="font-black text-cyan-600">{selectedInvoice.amount.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedInvoice(null)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<Printer className="w-4 h-4" />}
                onClick={() => {
                  toast.success('Lệnh in hóa đơn điện tử demo đã được gửi');
                  setSelectedInvoice(null);
                }}
              >
                In hóa đơn VAT
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
