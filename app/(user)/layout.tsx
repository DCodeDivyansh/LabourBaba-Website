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
    if (!customerId) {
      console.warn("[AuthHydrator] no customer_id cookie found - user will show as Guest");
      return null;
    }

    const response = await getCurrentClient();
    console.log("[AuthHydrator] getCurrentClient() raw response:", JSON.stringify(response));

    const data = response?.data ?? response;
    if (!data?.id) {
      console.warn(
        "[AuthHydrator] getCurrentClient() response had no usable id - check the shape logged above against what's expected: { id, name, phone } (optionally wrapped in { data: {...} })"
      );
      return null;
    }

    return {
      id: data.id,
      name: data.name ?? "",
      phone: data.phone ?? "",
      customer_id: data.id,
    };
  } catch (err) {
    console.error("[AuthHydrator] getCurrentClient() threw:", err);
    // Backend hiccup or session hiccup - fail quietly on the page itself.
    // proxy.ts has already confirmed a session cookie exists, so the page
    // still renders - it just shows the Guest fallback for this request.
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
