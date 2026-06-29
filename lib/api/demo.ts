"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { apiCall } from "./api";
apiCall
export async function getDemo() {
  console.log(((await apiCall.get("/health")).data));
}