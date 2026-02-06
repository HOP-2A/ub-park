"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

type Info = { status?: string; distance?: string; duration?: string };

export default function SimpleGoogleMap() {
  const mapDivRef = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null,
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null,
  );

  const currentLocationRef = useRef<google.maps.LatLngLiteral | null>(null);

  const [info, setInfo] = useState<Info>({});

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setOptions({
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        v: "weekly",
      });

      const { Map } = (await importLibrary("maps")) as google.maps.MapsLibrary;

      if (cancelled || !mapDivRef.current) return;

      // 🔹 10 hardcoded locations
      const locations = [
        { lat: 47.9186, lng: 106.9176, title: "Center" },
        { lat: 47.9205, lng: 106.9152, title: "Location 2" },
        { lat: 47.9162, lng: 106.9214, title: "Location 3" },
        { lat: 47.9221, lng: 106.9188, title: "Location 4" },
        { lat: 47.9148, lng: 106.9137, title: "Location 5" },
        { lat: 47.9199, lng: 106.9251, title: "Location 6" },
        { lat: 47.9234, lng: 106.9106, title: "Location 7" },
        { lat: 47.9171, lng: 106.9293, title: "Location 8" },
        { lat: 47.9213, lng: 106.9227, title: "Location 9" },
        { lat: 47.9156, lng: 106.9181, title: "Location 10" },
      ];

      // Default map (will recenter after GPS)
      const map = new Map(mapDivRef.current, {
        center: locations[0],
        zoom: 13,
      });
      mapRef.current = map;

      // Directions
      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map,
      });

      // 📍 Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            currentLocationRef.current = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };

            // Marker for "You"
            new google.maps.Marker({
              map,
              position: currentLocationRef.current,
              title: "You are here",
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "white",
                strokeWeight: 2,
              },
            });

            map.setCenter(currentLocationRef.current);
            map.setZoom(14);
          },
          () => {
            setInfo({ status: "Location permission denied" });
          },
        );
      }

      // Create markers
      locations.forEach((loc, index) => {
        const position = { lat: loc.lat, lng: loc.lng };

        const marker = new google.maps.Marker({
          map,
          position,
          title: loc.title,
          label: `${index + 1}`,
        });

        marker.addListener("click", () => {
          drawRoute(position);
        });
      });
    }

    function drawRoute(destination: google.maps.LatLngLiteral) {
      if (
        !currentLocationRef.current ||
        !directionsServiceRef.current ||
        !directionsRendererRef.current
      ) {
        setInfo({ status: "Waiting for current location..." });
        return;
      }

      setInfo({ status: "Routing..." });

      directionsServiceRef.current.route(
        {
          origin: currentLocationRef.current,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status !== "OK" || !result) {
            setInfo({ status: `Route failed: ${status}` });
            return;
          }

          directionsRendererRef.current!.setDirections(result);

          const leg = result.routes?.[0]?.legs?.[0];
          setInfo({
            status: "OK",
            distance: leg?.distance?.text,
            duration: leg?.duration?.text,
          });
        },
      );
    }

    init();

    return () => {
      cancelled = true;
      directionsRendererRef.current?.setMap(null);
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ fontSize: 14 }}>
        {info.status && <div>Status: {info.status}</div>}
        {info.distance && <div>Distance: {info.distance}</div>}
        {info.duration && <div>Duration: {info.duration}</div>}
        <div style={{ opacity: 0.7 }}>
          Click any marker to route from your location
        </div>
      </div>

      <div
        ref={mapDivRef}
        style={{
          height: 520,
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
        }}
      />
    </div>
  );
}
