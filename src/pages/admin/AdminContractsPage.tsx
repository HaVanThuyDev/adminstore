import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { 
  FileCheck2, 
  Search, 
  Plus, 
  Eye, 
  Download, 
  CheckCircle2, 
  Clock, 
  PenTool, 
  Building2, 
  Calendar,
  X,
  FileSignature
} from 'lucide-react';
import { toast } from 'sonner';

interface Contract {
  id: string;
  contractNumber: string;
  title: string;
  partyB: string;
  representative: string;
  taxCode: string;
  value: number;
  startDate: string;
  endDate: string;
  status: 'SIGNED' | 'WAITING_SIGN' | 'DRAFT';
}

const initialContracts: Contract[] = [
  {
    id: 'ct-01',
    contractNumber: 'HDDT-2HT-2026/01',
    title: 'Hợp đồng Cung cấp & Triển khai Phần mềm Quản lý Cư dân 2HT Residence',
    partyB: 'Công ty Cổ phần Quản lý Tòa nhà Tân Phú',
    representative: 'Đỗ Quốc Bảo (Tổng Giám Đốc)',
    taxCode: '0316781290',
    value: 120000000,
    startDate: '2026-03-01',
    endDate: '2028-03-01',
    status: 'SIGNED',
  },
  {
    id: 'ct-02',
    contractNumber: 'HDDT-2HT-2026/02',
    title: 'Hợp đồng Bản quyền & Tích hợp Hệ sinh thái Sàn TMĐT 2HT E-Commerce',
    partyB: 'Công ty TNHH Thời Trang Quốc Tế V-Style',
    representative: 'Nguyễn Thị Minh Hà (Giám đốc)',
    taxCode: '0107892341',
    value: 85000000,
    startDate: '2026-06-15',
    endDate: '2027-06-15',
    status: 'SIGNED',
  },
  {
    id: 'ct-03',
    contractNumber: 'HDDT-2HT-2026/03',
    title: 'Hợp đồng Cung ứng Giải pháp ERP Doanh nghiệp 2HT Business',
    partyB: 'Công ty Cổ phần Sản xuất Cơ khí Chính xác Thăng Long',
    representative: 'Trần Văn Mạnh (Chủ tịch HĐQT)',
    taxCode: '0104561234',
    value: 260000000,
    startDate: '2026-09-01',
    endDate: '2027-09-01',
    status: 'WAITING_SIGN',
  },
  {
    id: 'ct-04',
    contractNumber: 'HDDT-2HT-2026/04',
    title: 'Thỏa thuận Bảo mật Thông tin (NDA) & Khảo sát May đo Phần mềm',
    partyB: 'Tập đoàn Đầu tư & Công nghệ FinTech Á Châu',
    representative: 'Vũ Hải Đăng (CTO)',
    taxCode: '0318997766',
    value: 0,
    startDate: '2026-10-01',
    endDate: '2027-10-01',
    status: 'DRAFT',
  },
];

export const AdminContractsPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const filteredContracts = contracts.filter((ct) => {
    const matchSearch =
      ct.contractNumber.toLowerCase().includes(search.toLowerCase()) ||
      ct.partyB.toLowerCase().includes(search.toLowerCase()) ||
      ct.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || ct.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'SIGNED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Đã ký số CA
          </span>
        );
      case 'WAITING_SIGN':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Chờ đối tác ký
          </span>
        );
      case 'DRAFT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <PenTool className="w-3.5 h-3.5 text-slate-500" /> Bản thảo (Draft)
          </span>
        );
    }
  };

  const handleCreateMockContract = () => {
    const newCt: Contract = {
      id: `ct-${Date.now()}`,
      contractNumber: `HDDT-2HT-2026/0${contracts.length + 5}`,
      title: 'Hợp đồng Cung cấp Bản quyền Phần mềm 2HT (Bản thử nghiệm)',
      partyB: 'Công ty Cổ phần Giải pháp Doanh nghiệp Mới',
      representative: 'Nguyễn Văn A (Giám đốc)',
      taxCode: '0109998888',
      value: 60000000,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2027-10-10',
      status: 'WAITING_SIGN',
    };
    setContracts([newCt, ...contracts]);
    toast.success('Đã khởi tạo hợp đồng điện tử demo thành công');
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileSignature className="w-6 h-6 text-indigo-600" /> Quản lý Hợp đồng Điện tử (e-Contract)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản trị hợp đồng phần mềm, chữ ký số (CA/USB Token), theo dõi tiến độ ký kết và thời hạn bảo hành phần mềm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={handleCreateMockContract}
            icon={<Plus className="w-4 h-4" />}
          >
            Soạn hợp đồng mới
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Tìm số hợp đồng, tên khách hàng, dự án..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Trạng thái ký:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium focus:outline-none"
          >
            <option value="ALL">Tất cả hợp đồng ({contracts.length})</option>
            <option value="SIGNED">Đã ký số CA</option>
            <option value="WAITING_SIGN">Chờ đối tác ký</option>
            <option value="DRAFT">Bản nháp</option>
          </select>
        </div>
      </div>

      {/* Contracts Table Full Width */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Số hợp đồng</th>
                <th className="py-3.5 px-4">Tên hợp đồng & Hạng mục</th>
                <th className="py-3.5 px-4">Đối tác (Bên B)</th>
                <th className="py-3.5 px-4 text-right">Giá trị hợp đồng</th>
                <th className="py-3.5 px-4">Hiệu lực</th>
                <th className="py-3.5 px-4">Tình trạng ký</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map((ct) => (
                <tr key={ct.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-700">
                    {ct.contractNumber}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-slate-900 leading-snug">{ct.title}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{ct.partyB}</div>
                    <div className="text-[11px] text-slate-500">Đại diện: {ct.representative}</div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900 text-sm">
                    {ct.value > 0 ? `${ct.value.toLocaleString('vi-VN')} đ` : 'Hợp đồng nguyên tắc'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{ct.startDate}</div>
                    <div className="text-[10px] text-slate-400">Đến {ct.endDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {getStatusBadge(ct.status)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedContract(ct)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                        title="Xem hợp đồng chi tiết"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toast.info(`Đang tải file PDF hợp đồng ${ct.contractNumber}...`)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-400 hover:bg-cyan-50 transition-colors"
                        title="Tải văn bản hợp đồng"
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

      {/* Contract Detail Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl p-6 sm:p-7 space-y-5 relative">
            <button
              onClick={() => setSelectedContract(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <FileSignature className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Hợp đồng điện tử</span>
                <h3 className="text-base font-black text-slate-900">{selectedContract.contractNumber}</h3>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="text-slate-500 font-semibold">Tên hợp đồng:</div>
                <div className="font-bold text-slate-900 text-sm">{selectedContract.title}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bên A (Nhà cung cấp):</span>
                  <strong className="text-slate-900">2HT Information Technology</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bên B (Khách hàng):</span>
                  <strong className="text-slate-900 text-right">{selectedContract.partyB}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Đại diện ký Bên B:</span>
                  <span className="text-slate-800">{selectedContract.representative}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                  <span className="font-bold text-slate-800">Giá trị hợp đồng:</span>
                  <span className="font-black text-indigo-600">
                    {selectedContract.value > 0 ? `${selectedContract.value.toLocaleString('vi-VN')} đ` : 'Thỏa thuận'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedContract(null)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<PenTool className="w-4 h-4" />}
                onClick={() => {
                  toast.success('Đã gửi thông báo ký số qua email của đại diện đối tác');
                  setSelectedContract(null);
                }}
              >
                Gửi yêu cầu Ký Số CA
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
