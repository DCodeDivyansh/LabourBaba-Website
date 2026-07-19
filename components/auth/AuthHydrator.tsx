"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getClientCustomerId } from "@/lib/client-cookies";
import { joinCustomerRoom } from "@/services/socket";
import type { User } from "@/types/types";

/**
 * Fills in the client-side auth store with the real, server-fetched user on
 * first load of any protected page - so a refresh, a new tab, or a direct
 * visit to a saved cookie all show the real name/phone instead of the
 * "Guest" / placeholder fallback. (Previously the store was only ever
 * populated inside the login form's own submit handler, which meant it was
 * empty on every page load other than the one right after typing a
 * password.)
 */
export default function AuthHydrator({ user }: { user: User | null }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }

    const customerId = getClientCustomerId();
    if (customerId) {
      joinCustomerRoom(customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return null;
}
