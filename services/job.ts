"use server";
import { getCustomerId } from "@/lib/api/auth";
import { Job } from "@/lib/types";
import { apiCall } from "@/lib/api/api";

interface CreateJobRequest {
  customer_id?: string;
  latitude: number;
  longitude: number;
  location: string;
  requirements: {
    skill_type: string;
    worker_count_needed: number;
    rate_per_day: number;
    wave_size?: number;
  }[];
}

interface AddRequirementRequest {
  skill_type: string;
  worker_count_needed: number;
  rate_per_day: number;
  wave_size: number;
}

interface CreateJobResponse {
  id: string;
  customer_id: string;
  [key: string]: any;
}

async function createJob(data: CreateJobRequest): Promise<CreateJobResponse> {
  try {
    const customerId = await getCustomerId();
    data.customer_id = customerId;
    const res = await apiCall.post(
      `/api/jobs`,
      data,
    );
    console.log("Job created successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error as Error;
  }
}

async function addJobRequirement(
  jobId: string,
  data: AddRequirementRequest
) {
  console.log("Adding requirement to job:", jobId, data);
  try {
    const res = await apiCall.post(
      `/api/jobs/${jobId}/requirements`,
      data,
    );
    return res.data;
  } catch (error) {
    console.error("Error adding job requirement:", error);
    throw error as Error;
  }
}

async function getJobs(): Promise<Job[]> {
  try {
    const customerId = await getCustomerId();
    const res = await apiCall.get(`/api/jobs`,
      {
        params: {
          customer_id: customerId,
        }
      }
    );
    // console.log("Fetched jobs response:", res.data);

    // Handle different API response formats
    let jobsData: any = res.data;
    if (jobsData && typeof jobsData === 'object' && !Array.isArray(jobsData)) {
      // If it's an object, check for common data properties
      if (Array.isArray(jobsData.data)) {
        jobsData = jobsData.data;
      } else if (Array.isArray(jobsData.jobs)) {
        jobsData = jobsData.jobs;
      } else if (Array.isArray(jobsData.results)) {
        jobsData = jobsData.results;
      } else {
        // If no recognized array property, check if the object itself looks like a single job
        if (jobsData.id && jobsData.customer_id) {
          jobsData = [jobsData];
        } else {
          jobsData = [];
        }
      }
    }

    // Ensure we return an array
    return Array.isArray(jobsData) ? jobsData : [];
  } catch (error) {
    console.error("Error getting jobs:", error);
    return []; // Return empty array on error instead of throwing
  }
}

async function getJobById(jobId: string): Promise<Job> {
  try {
    const res = await apiCall.get(`/api/jobs/${jobId}`,
    );
    console.log("Fetched job:", res.data);
    // The backend responds with { success, data: job }. Callers (e.g. the
    // waiting page) expect the Job object itself (job.location, etc.), so
    // unwrap it here instead of returning the envelope.
    return res.data?.data ?? res.data;
  } catch (error) {
    console.error("Error getting job:", error);
    throw error as Error;
  }
}

async function cancelJob(jobId: string) {
  try {
    const res = await apiCall.patch(`/api/jobs/${jobId}/cancel`);
    return res.data;
  } catch (error) {
    console.error("Error cancelling job:", error);
    throw error as Error;
  }
}

export { createJob, getJobs, getJobById, addJobRequirement, cancelJob };
