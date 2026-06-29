export interface JobRequirement {
  id?: string;
  skill_type: string;
  worker_count_needed: number;
  rate_per_day: number;
  wave_size?: number;
}

export interface CreateJobRequest {
  customer_id?: string;
  latitude: number;
  longitude: number;
  location: string;
  requirements: JobRequirement[];
}

export interface AddRequirementRequest {
  skill_type: string;
  worker_count_needed: number;
  rate_per_day: number;
  wave_size: number;
}

export interface CreateJobResponse {
  id: string;
  [key: string]: any;
}

export interface Job {
  id: string;
  customer_id: string;
  latitude: number;
  longitude: number;
  location: string;
  requirements: JobRequirement[];
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  dispatch_status?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  customer_id: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export interface CreateJobFormData {
  location: LocationData | null;
  requirements: JobRequirement[];
  scheduledDate?: Date;
}
