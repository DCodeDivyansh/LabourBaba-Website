"use server";
import { apiCall } from "./api";

export interface SkillCategory {
  id: string;
  name: string;
}

export async function getSkills() {
  const response = await apiCall.get("/api/skill");
  return response.data;
}

export async function addSkill(data: { name: string }) {
  const response = await apiCall.post("/api/skill/add", data);
  return response.data;
}
