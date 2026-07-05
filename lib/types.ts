export interface JobRequirement {
  id: string;
  job_id: string;
  skill_type: string;
  worker_count_needed: number;
  worker_count_filled: number;
  rate_per_day: number;
  wave_size: number;
  current_wave: number;
  status: string;
}

export interface AcceptedWorker {
  bookingId: string;
  requirementId: string;
  worker: {
    id: string;
    name: string;
    phone: string;
    skill_type?: string;
    worker_score?: number;
  };
  skill_type?: string;
}

export interface Job {
  id: string;
  customer_id: string;
  latitude: number;
  longitude: number;
  location: string;
  job_requirement: JobRequirement[];
  status: 'OPEN' | 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  dispatch_status?: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string | null;
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
  requirements: {
    skill_type: string;
    worker_count_needed: number;
    rate_per_day: number;
    wave_size?: number;
  }[];
  scheduledDate?: Date;
}
