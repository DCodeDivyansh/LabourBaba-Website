"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getClientCustomerId } from "@/lib/client-cookies";
import { joinCustomerRoom } from "@/services/socket";
import type { User } from "@/types/types";

interface AuthHydratorProps {
  user: User | null;
}

export default function AuthHydrator({
  user,
}: AuthHydratorProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore(
    (state) => state.setIsAuthenticated
  );
  const setLoading = useAuthStore(
    (state) => state.setLoading
  );

  useEffect(() => {
    if (user) {
      setUser(user);
      setIsAuthenticated(true);

      /*
       * customer_id is currently only used by Socket.IO.
       *
       * It is NOT used for authentication.
       */
      const customerId = getClientCustomerId();

      if (customerId) {
        joinCustomerRoom(customerId);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, [
    user,
    setUser,
    setIsAuthenticated,
    setLoading,
  ]);

  return null;
}