import { create } from 'zustand';
import { Job } from '@/lib/types';

interface JobStore {
  activeJobId: string | null;
  jobs: Job[];
  dispatchStatus: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  setActiveJob: (id: string) => void;
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  removeJob: (jobId: string) => void;
  updateDispatch: (jobId: string, status: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetJobStore: () => void;
}

const initialState = {
  activeJobId: null,
  jobs: [],
  dispatchStatus: {},
  isLoading: false,
  error: null,
};

export const useJobStore = create<JobStore>((set, get) => ({
  ...initialState,

  setActiveJob: (id) => set({ activeJobId: id }),

  setJobs: (jobs) => set({ jobs }),

  addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),

  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map((job) =>
      job.id === jobId ? { ...job, ...updates } : job
    ),
  })),

  removeJob: (jobId) => set((state) => ({
    jobs: state.jobs.filter((job) => job.id !== jobId),
  })),

  updateDispatch: (jobId, status) => set((state) => ({
    dispatchStatus: { ...state.dispatchStatus, [jobId]: status },
  })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  resetJobStore: () => set(initialState),
}));
