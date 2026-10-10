import { ConsultationRequest, ConsultationStatus } from '../types/consultation';
import { initialConsultations } from '../data/initialConsultations';
import { storage, STORAGE_KEYS } from './storage';

export const consultationService = {
  getAll(): ConsultationRequest[] {
    return storage.get<ConsultationRequest[]>(STORAGE_KEYS.CONSULTATIONS, initialConsultations);
  },

  create(req: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status'>): ConsultationRequest {
    const list = this.getAll();
    const newReq: ConsultationRequest = {
      ...req,
      id: `REQ-${new Date().getFullYear()}-${String(list.length + 1).padStart(3, '0')}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newReq);
    storage.set(STORAGE_KEYS.CONSULTATIONS, list);
    return newReq;
  },

  updateStatus(id: string, status: ConsultationStatus, assignedTo?: string, notes?: string): boolean {
    const list = this.getAll();
    const item = list.find((c) => c.id === id);
    if (item) {
      item.status = status;
      if (assignedTo !== undefined) item.assignedTo = assignedTo;
      if (notes !== undefined) item.notes = notes;
      return storage.set(STORAGE_KEYS.CONSULTATIONS, list);
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
