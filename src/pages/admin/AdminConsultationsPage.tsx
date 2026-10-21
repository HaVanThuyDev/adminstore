import React, { useState, useEffect } from 'react';
import { consultationService } from '../../services/consultationService';
import { ConsultationRequest, ConsultationStatus } from '../../types/consultation';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { MessageSquare, Search, Trash2, Eye, UserCheck, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const AdminConsultationsPage: React.FC = () => {
  const [consultations, setConsultations] = useState<ConsultationRequest[]>(() => consultationService.getAll());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReq, setSelectedReq] = useState<ConsultationRequest | null>(null);

  const [assignedStaff, setAssignedStaff] = useState('');
  const [notes, setNotes] = useState('');

  const refreshList = async () => {
    const list = await consultationService.fetchAll();
    setConsultations(list);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: ConsultationStatus) => {
    consultationService.updateStatus(id, newStatus, assignedStaff || undefined, notes || undefined);
    refreshList();
    toast.success(`Đã cập nhật trạng thái phiếu tư vấn thành ${newStatus}`);
    if (selectedReq && selectedReq.id === id) {
      setSelectedReq({ ...selectedReq, status: newStatus, assignedTo: assignedStaff, notes });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Xóa phiếu tư vấn ${id}?`)) {
      consultationService.delete(id);
      refreshList();
      toast.info(`Đã xóa phiếu ${id}`);
      if (selectedReq?.id === id) setSelectedReq(null);
    }
  };

  const filtered = consultations.filter((c) =>
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.serviceInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: ConsultationStatus) => {
    switch (status) {
      case 'NEW':
        return <Badge variant="warning" size="sm">Mới (Chưa xử lý)</Badge>;
      case 'CONTACTED':
        return <Badge variant="accent" size="sm">Đã liên hệ</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="primary" size="sm">Đang tư vấn</Badge>;
      case 'COMPLETED':
        return <Badge variant="success" size="sm">Hoàn thành chốt</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Đã hủy</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-400" />
          Yêu cầu Tư vấn & Báo giá ({consultations.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Danh sách tiếp nhận yêu cầu từ biểu mẫu liên hệ trang chủ và trang liên hệ.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm theo tên, email, số điện thoại..."
          className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-primary"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider">
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Giải pháp quan tâm</th>
                <th className="p-4">Ngân sách</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Phụ trách</th>
                <th className="p-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{c.fullName}</div>
                    <div className="text-[11px] text-slate-500">{c.phone} • {c.email}</div>
                    <div className="text-[10px] text-slate-500">{c.company || 'Doanh nghiệp'}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-slate-600 font-medium line-clamp-1">{c.serviceInterest}</span>
                  </td>
                  <td className="p-4 font-semibold text-accent">
                    {c.estimatedBudget}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(c.status)}
                  </td>
                  <td className="p-4 text-slate-500">
                    {c.assignedTo || 'Chưa gán'}
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedReq(c);
                          setAssignedStaff(c.assignedTo || '');
                          setNotes(c.notes || '');
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-100 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consultation Modal */}
      <Modal
        isOpen={!!selectedReq}
        onClose={() => setSelectedReq(null)}
        title={selectedReq ? `Phiếu yêu cầu: ${selectedReq.id}` : ''}
        subtitle="Chi tiết bài toán doanh nghiệp và phân công chuyên viên tư vấn."
        maxWidth="lg"
      >
        {selectedReq && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>Khách hàng: <strong className="text-slate-900">{selectedReq.fullName}</strong></div>
                <div>Điện thoại: <strong className="text-slate-900">{selectedReq.phone}</strong></div>
                <div>Email: <strong className="text-slate-900">{selectedReq.email}</strong></div>
                <div>Công ty: <strong className="text-slate-900">{selectedReq.company || '—'}</strong></div>
              </div>
              <div className="pt-2 text-slate-600">
                Giải pháp: <strong className="text-accent">{selectedReq.serviceInterest}</strong>
              </div>
              <div className="text-slate-600">
                Ngân sách dự kiến: <strong className="text-emerald-400">{selectedReq.estimatedBudget}</strong>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <h5 className="font-semibold text-slate-500 mb-1">Nội dung chi tiết bài toán:</h5>
              <p className="text-slate-700 text-sm leading-relaxed">{selectedReq.message}</p>
            </div>

            <div className="space-y-2">
              <label className="text-slate-500 block font-semibold">Chuyên viên phụ trách:</label>
              <input
                type="text"
                value={assignedStaff}
                onChange={(e) => setAssignedStaff(e.target.value)}
                placeholder="VD: Chuyên viên Hoàng Long"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-200">
              <span className="text-slate-500">Chuyển trạng thái:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus(selectedReq.id, 'CONTACTED')}
                >
                  Đã liên hệ
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleUpdateStatus(selectedReq.id, 'COMPLETED')}
                >
                  Hoàn tất tư vấn
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
