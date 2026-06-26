export interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
}

const BASE_URL = "https://nominatim.openstreetmap.org";

/**
 * Search locations by text
 * Example:
 * searchLocation("Lucknow")
 */
export async function searchLocation(
  query: string
): Promise<LocationResult[]> {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/search?format=jsonv2&q=${encodeURIComponent(
        query
      )}&limit=5`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
}

/**
 * Convert Latitude & Longitude to Address
 *
 * reverseGeocode(26.8467,80.9462)
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<string> {
  try {
    const response = await fetch(
      `${BASE_URL}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Reverse Geocoding failed");
    }

    const data = await response.json();

    return data.display_name;
  } catch (error) {
    console.error(error);

    return "Address not found";
  }
}

/**
 * Convert Address to Coordinates
 *
 * geocodeAddress("Lucknow Airport")
 */
export async function geocodeAddress(
  address: string
): Promise<LocationResult | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?format=jsonv2&q=${encodeURIComponent(
        address
      )}&limit=1`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const data = await response.json();

    if (data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error(error);

    return null;
  }
}