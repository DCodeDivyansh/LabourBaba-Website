export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue || null;
  }
  return null;
};

export const getClientCustomerId = (): string | null => {
  return getCookie("customer_id");
};

export const getClientAuthToken = (): string | null => {
  return getCookie("auth_token");
};
