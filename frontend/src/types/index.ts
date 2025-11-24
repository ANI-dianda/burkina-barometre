export interface Service {
  id: string;
  name: string;
  type: string;
  address: string;
  latitude?: number;
  longitude?: number;
  currentScore: number;
  administrationId: string;
  administration?: Administration;
  avis?: Avis[];
  createdAt: string;
  updatedAt: string;
}

export interface Administration {
  id: string;
  name: string;
  ministry?: string;
  services?: Service[];
  createdAt: string;
  updatedAt: string;
}

export interface Avis {
  id: string;
  ratingAccueil: number;
  ratingDelai: number;
  ratingResolution: number;
  comment?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  userId: string;
  serviceId: string;
  service?: Service;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  role: 'CITIZEN' | 'ADMIN' | 'MODERATOR';
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalServices: number;
  totalAvis: number;
  totalUsers: number;
  totalAdministrations: number;
  averageScore: number;
  recentAvis: Avis[];
}