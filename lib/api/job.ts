"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { getCustomerId } from "./auth";
import { Job, JobRequirement } from "@/lib/types";

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
  [key: string]: any;
}

async function createJob(data: CreateJobRequest): Promise<CreateJobResponse> {
  console.log("Creating job with data:", data);
  try {
    const customerId = await getCustomerId();
    data.customer_id = customerId;
    const tokenValue = (await cookies()).get("auth_token")?.value;
    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/jobs`,
      data,
      {
        headers: {
          authorization: `Bearer ${tokenValue}`,
          "Content-Type": "application/json",
        },
      }
    );
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
    const tokenValue = (await cookies()).get("auth_token")?.value;
    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/jobs/${jobId}/requirements`,
      data,
      {
        headers: {
          authorization: `Bearer ${tokenValue}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding job requirement:", error);
    throw error as Error;
  }
}

async function getJobs(): Promise<Job[]> {
  try {
    const tokenValue = (await cookies()).get("auth_token")?.value;
    const customerId = await getCustomerId();
    const res = await axios.get(`${process.env.BACKEND_URL}/api/jobs`,
      {
        headers: {
          authorization: `Bearer ${tokenValue}`,
          "Content-Type": "application/json",
        },
        params: {
          customer_id: customerId,
        }
      }
    );
    console.log("Fetched jobs response:", res.data);
    
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
    const tokenValue = (await cookies()).get("auth_token")?.value;
    const res = await axios.get(`${process.env.BACKEND_URL}/api/jobs/${jobId}`,
      {
        headers: {
          authorization: `Bearer ${tokenValue}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Fetched job:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error getting job:", error);
    throw error as Error;
  }
}

export { createJob, getJobs, getJobById, addJobRequirement };
