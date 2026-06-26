const LOCATION_STORAGE_KEY = "labourbaba_user_location";

export interface SavedLocationData {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: number;
}

export function isLocalStorageAvailable(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.error("LocalStorage is not available:", error);
    return false;
  }
}

export function getSavedLocation(): SavedLocationData | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  const savedData = localStorage.getItem(LOCATION_STORAGE_KEY);

  if (!savedData) {
    return null;
  }

  try {
    const parsed = JSON.parse(savedData) as SavedLocationData;

    if (
      typeof parsed.latitude === "number" &&
      typeof parsed.longitude === "number" &&
      !isNaN(parsed.latitude) &&
      !isNaN(parsed.longitude)
    ) {
      return parsed;
    }
  } catch (error) {
    console.error("Failed to parse saved location:", error);
    localStorage.removeItem(LOCATION_STORAGE_KEY);
  }

  return null;
}

export function saveLocation(
  latitude: number,
  longitude: number,
  address?: string,
): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  const locationData: SavedLocationData = {
    latitude: latitude,
    longitude: longitude,
    address: address,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(locationData));
    console.log("Location saved to localStorage:", locationData);
    return true;
  } catch (error) {
    console.error("Failed to save location:", error);
    return false;
  }
}

export function hasLocationChanged(
  newLat: number,
  newLng: number,
  savedLat: number,
  savedLng: number,
  threshold = 0.0001,
): boolean {
  const latDiff = Math.abs(newLat - savedLat);
  const lngDiff = Math.abs(newLng - savedLng);
  return latDiff > threshold || lngDiff > threshold;
}
