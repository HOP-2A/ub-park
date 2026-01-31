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

export default function LeafletMap({ lat, lng, zoom = 15 }: Props) {
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

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

      <Marker position={[lat, lng]}>
        <Popup>Selected place</Popup>
      </Marker>
    </MapContainer>
  );
}
