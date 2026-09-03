import { getCurrentClient } from "@/lib/api/client";
import AuthHydrator from "@/components/auth/AuthHydrator";
import type { User } from "@/types/types";

/**
 * Load the currently authenticated customer from the backend.
 *
 * The backend gets the customer ID from the verified JWT.
 * We do not depend on the customer_id cookie anymore.
 */
async function loadCurrentUser(): Promise<User | null> {
  try {
    const customer = await getCurrentClient();

    if (!customer?.id) {
      return null;
    }

    return {
      id: customer.id,
      name: customer.name ?? "",
      phone: customer.phone ?? "",
      customer_id: customer.id,
    };
  } catch (error) {
    console.error(
      "[UserLayout] Failed to load current user:",
      error
    );

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