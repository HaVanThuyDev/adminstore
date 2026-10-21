import { ConsultationRequest, ConsultationStatus } from '../types/consultation';
import { initialConsultations } from '../data/initialConsultations';
import { storage, STORAGE_KEYS } from './storage';
import { apiClient } from './apiClient';

export const consultationService = {
  getAll(): ConsultationRequest[] {
    return storage.get<ConsultationRequest[]>(STORAGE_KEYS.CONSULTATIONS, initialConsultations);
  },

  async fetchAll(): Promise<ConsultationRequest[]> {
    try {
      const data = await apiClient.get<ConsultationRequest[]>('/consultations');
      if (Array.isArray(data) && data.length > 0) {
        storage.set(STORAGE_KEYS.CONSULTATIONS, data);
        return data;
      }
    } catch (e) {
      console.warn('Backend chưa sẵn sàng, dùng cache local');
    }
    return this.getAll();
  },

  async create(req: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>): Promise<ConsultationRequest> {
    const list = this.getAll();
    const newReq: ConsultationRequest = {
      ...req,
      id: `REQ-${new Date().getFullYear()}-${String(list.length + 1).padStart(3, '0')}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newReq);
    storage.set(STORAGE_KEYS.CONSULTATIONS, list);

    try {
      await apiClient.post('/consultations', {
        fullName: newReq.fullName,
        phone: newReq.phone,
        email: newReq.email,
        company: newReq.company,
        serviceInterest: newReq.serviceInterest,
        estimatedBudget: newReq.estimatedBudget,
        message: newReq.message,
      });
    } catch (e) {}

    return newReq;
  },

  async updateStatus(id: string, status: ConsultationStatus, assignedTo?: string, notes?: string): Promise<boolean> {
    const list = this.getAll();
    const item = list.find((c) => c.id === id);
    if (item) {
      item.status = status;
      if (assignedTo !== undefined) item.assignedTo = assignedTo;
      if (notes !== undefined) item.notes = notes;
      storage.set(STORAGE_KEYS.CONSULTATIONS, list);

      try {
        await apiClient.patch(`/consultations/${id}/status`, { status });
      } catch (e) {}

      return true;
    }
    return false;
  },

  delete(id: string): boolean {
    const list = this.getAll().filter((c) => c.id !== id);
    return storage.set(STORAGE_KEYS.CONSULTATIONS, list);
  },

  resetToDefault(): void {
    storage.set(STORAGE_KEYS.CONSULTATIONS, initialConsultations);
  }
};
