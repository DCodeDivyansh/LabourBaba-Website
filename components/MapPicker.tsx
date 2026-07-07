"use client";

import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
} from "react-leaflet";

import MapMarker from "./MapMarker";
import MapEvents from "./MapEvents";
import SearchLocation from "./SearchLocation";
import CurrentLocationButton from "./CurrentLocationButton";
import LocationInfo from "./LocationInfo";

import { reverseGeocode } from "@/lib/geocode";
import { getSavedLocation, saveLocation } from "@/lib/location-storage";

interface MapPickerProps {
  initialPosition?: [number, number];
  onLocationSelect?: (location: { lat: number; lng: number; address?: string }) => void;
}

export default function MapPicker({
  initialPosition = [26.8467, 80.9462], // Lucknow
  onLocationSelect,
}: MapPickerProps) {
  const [position, setPosition] =
    useState<[number, number]>(initialPosition);

  const [address, setAddress] = useState(
    "Fetching address..."
  );

  // Load saved location and address from localStorage on mount
  useEffect(() => {
    const saved = getSavedLocation();
    if (saved) {
      setPosition([saved.latitude, saved.longitude]);
      if (saved.address) {
        setAddress(saved.address);
      }
    }
  }, []);

  // Reverse Geocode whenever location changes
  useEffect(() => {
    const fetchAddress = async () => {
      const result = await reverseGeocode(
        position[0],
        position[1]
      );

      setAddress(result);
      // Save the new address to localStorage
      saveLocation(position[0], position[1], result);

      // Notify parent selection
      if (onLocationSelect) {
        onLocationSelect({ lat: position[0], lng: position[1], address: result });
      }
    };

    fetchAddress();
  }, [position, onLocationSelect]);

  return (
    <div className="space-y-5">

      {/* Search */}
      <SearchLocation
        onSelectLocation={(
          newPosition,
          newAddress
        ) => {
          setPosition(newPosition);
          setAddress(newAddress);
          // Save when location and address immediately when selected from search
          saveLocation(newPosition[0], newPosition[1], newAddress);
          if (onLocationSelect) {
            onLocationSelect({ lat: newPosition[0], lng: newPosition[1], address: newAddress });
          }
        }}
      />

      {/* Map */}
      <div
        className="
          h-125
          rounded-3xl
          overflow-hidden
          border
          border-[#E2BFB0]
          shadow-xl
        "
      >
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* OpenStreetMap */}
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Auto Fly */}
          <MapEvents
            position={position}
          />

          {/* Draggable Marker */}
          <MapMarker
            position={position}
            onPositionChange={
              setPosition
            }
          />
        </MapContainer>
      </div>

      {/* Current Location */}
      <CurrentLocationButton
        onLocationFound={(
          newPosition
        ) => {
          setPosition(newPosition);
        }}
      />

      {/* Location Details */}
      <LocationInfo
        position={position}
        address={address}
      />
    </div>
  );
}