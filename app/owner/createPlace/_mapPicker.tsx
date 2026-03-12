"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { RefObject } from "react";

// Fix default marker icon paths
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

type LatLng = { lat: number; lng: number };

function ClickToPick({ onPick }: { onPick: (pos: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

type Props = {
  picked: LatLng | null;
  defaultCenter: LatLng;
  onPick: (pos: LatLng) => void;
  mapRef: RefObject<L.Map | null>;
};

export default function MapPicker({
  picked,
  defaultCenter,
  onPick,
  mapRef,
}: Props) {
  return (
    <MapContainer
      center={picked ?? defaultCenter}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full"
      ref={mapRef}
      whenReady={() => {
        console.log("Map is ready", mapRef.current);
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickToPick onPick={onPick} />

      {picked && <Marker position={[picked.lat, picked.lng]} />}
    </MapContainer>
  );
}
