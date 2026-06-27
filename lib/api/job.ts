import axios from "axios";
async function getJob() {
  const res = await axios.get(`${process.env.BACKEND_URL}/job`);
  console.log(res.data);
}

async function createJob(data: any) {
  const res = await axios.post(`${process.env.BACKEND_URL}/job`, data);
  console.log(res.data);
}

export { createJob, getJob };
