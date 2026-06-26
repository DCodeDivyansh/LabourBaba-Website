"use client";

import { useMemo } from "react";
import { Marker } from "react-leaflet";
import L, { LeafletEvent } from "leaflet";

// Fix missing marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapMarkerProps {
  position: [number, number];

  onPositionChange: (
    position: [number, number]
  ) => void;
}

export default function MapMarker({
  position,
  onPositionChange,
}: MapMarkerProps) {
  const eventHandlers = useMemo(
    () => ({
      dragend(event: LeafletEvent) {
        const marker = event.target;

        const latLng = marker.getLatLng();

        onPositionChange([
          latLng.lat,
          latLng.lng,
        ]);
      },
    }),
    [onPositionChange]
  );

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={eventHandlers}
    />
  );
}