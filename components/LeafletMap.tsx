"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
};

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true });
  }, [lat, lng, map]);

  return null;
}

// ✅ Custom marker icon — created inside component to avoid SSR window access

export default function LeafletMap({ lat, lng, zoom = 15 }: Props) {
  // Created here (not at module scope) so Leaflet never touches `window` during SSR
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return (
      <div className="h-full w-full rounded-xl bg-gray-100 flex items-center justify-center">
        Invalid coordinates
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Recenter lat={lat} lng={lng} />

      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>Selected place</Popup>
      </Marker>
    </MapContainer>
  );
}
