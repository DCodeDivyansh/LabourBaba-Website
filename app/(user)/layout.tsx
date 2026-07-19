import { getCurrentClient } from "@/lib/api/client";
import { getCustomerId } from "@/lib/api/auth";
import AuthHydrator from "@/components/auth/AuthHydrator";
import type { User } from "@/types/types";

// Fetches the logged-in customer's real profile on the server, where the
// httpOnly auth cookie is actually readable, and hands it down to a client
// component that hydrates the (in-memory, client-only) auth store with it.
// Without this, any page load that isn't the split-second after submitting
// the login form shows placeholder/default data instead of the real user.
async function loadCurrentUser(): Promise<User | null> {
  try {
    const customerId = await getCustomerId();
    if (!customerId) return null;

    const response = await getCurrentClient();
    const data = response?.data ?? response;
    if (!data?.id) return null;

    return {
      id: data.id,
      name: data.name ?? "",
      phone: data.phone ?? "",
      customer_id: data.id,
    };
  } catch {
    // Backend hiccup or session hiccup - fail quietly. The page still
    // renders; proxy.ts has already confirmed a session cookie exists.
    return null;
  }
}

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await loadCurrentUser();

  return (
    <div className="min-h-screen">
      <AuthHydrator user={user} />
      {children}
    </div>
  );
}
