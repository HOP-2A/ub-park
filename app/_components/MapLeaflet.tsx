"use client";

import React, { useEffect } from "react";
import * as L from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Default Leaflet marker icons fix
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// LatLng type
export type LatLng = { lat: number; lng: number };

// Props interface
interface LeafletMapProps {
  picked: LatLng | null;
  defaultCenter: LatLng;
  onPick: (pos: LatLng) => void;
  mapRef: React.MutableRefObject<L.Map | null>;
}

export default function LeafletMap({
  picked,
  defaultCenter,
  onPick,
  mapRef,
}: LeafletMapProps) {
  // Click to pick coordinates
  function ClickToPick() {
    useMapEvents({
      click(e) {
        onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  }

  // Map ref setter
  function MapSetter() {
    const map = useMap();
    useEffect(() => {
      mapRef.current = map;
    }, [map]);
    return null;
  }

  return (
    <MapContainer
      center={picked ?? defaultCenter}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <ClickToPick />
      <MapSetter />
      {picked && <Marker position={[picked.lat, picked.lng]} />}
    </MapContainer>
  );
}
