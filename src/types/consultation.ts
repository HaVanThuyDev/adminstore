export type ConsultationStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ConsultationRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  serviceInterest: string;
  estimatedBudget: string;
  message: string;
  status: ConsultationStatus;
  assignedTo?: string;
  notes?: string;
  createdAt: string;
}
