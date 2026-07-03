import TopNavbar from "@/components/TopNavbar";
import BottomNav from "@/components/BottomNav";
import RequestsList from "@/components/RequestsList";
import { getJobs } from "@/services/job";
import { Job } from "@/lib/types";
import { disconnectSocket } from "@/services/socket";
export default async function RequestsPage() {
  let jobs: Job[] = [];
  try {
    disconnectSocket()
    const fetchedJobs = await getJobs();
    jobs = Array.isArray(fetchedJobs) ? fetchedJobs : [];
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }
  return (
    <main className="min-h-screen bg-[#F8F9FB] pb-24">
      <TopNavbar />
      <section className="mx-auto max-w-md px-4 pt-20">
        <RequestsList jobs={jobs} />
      </section>
      <BottomNav />
    </main>
  );
}
