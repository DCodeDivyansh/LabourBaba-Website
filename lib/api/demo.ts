import axios from "axios";
export async function getDemo() {
 const res = await axios.get(`${process.env.BACKEND_URL}/health`);
 console.log(res.data);
  return {
    message: "Hello, World!",
  };
}