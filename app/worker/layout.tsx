import { ReactNode } from "react";

export default function WorkerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      {children}
    </div>
  );
}
