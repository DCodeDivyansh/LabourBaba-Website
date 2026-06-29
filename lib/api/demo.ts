"use server";
import axios from "axios";
import { cookies } from "next/headers";
export async function getDemo() {
  console.log(process.env.BACKEND_URL);
  
  const cookie = cookies();
  const customerId =  (await cookie).get("customer_id");
  console.log(customerId);
 const res = await axios.get(`${process.env.BACKEND_URL}/health`);
 console.log(res.data);
  return {
    message: "Hello, World!",
  };
}