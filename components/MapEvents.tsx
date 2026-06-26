"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapEventsProps {
  position: [number, number];
  zoom?: number;
}

export default function MapEvents({
  position,
  zoom = 16,
}: MapEventsProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, zoom, {
      animate: true,
      duration: 1.5,
    });
  }, [position, zoom, map]);

  return null;
}