import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // console.log("Mapbox access token:", process.env.NEXT_PUBLIC_API_MAPBOX);
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_MAPBOX || "";
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      center: [-100.308318, 25.666685], // Barrio Antiguo, Nuevo León coordinates
      zoom: 16,
    });

    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-100.308318, 25.666685], // Barrio Antiguo, Nuevo León coordinates
          },
          properties: {
            title: "Cafe Aroma",
            description: "Cafe Aroma is a cozy spot in Barrio Antiguo.",
            message: "Welcome to Cafe Aroma! Enjoy your coffee!",
          },
        },
      ],
    };

    for (const marker of geojson.features) {
      const el = document.createElement("div");
      // const width = marker.properties.iconSize[0];
      // const height = marker.properties.iconSize[1];
      el.className = "marker";
      el.style.backgroundImage = `url('/logoCafeAroma.png')`;
      el.style.width = `50px`;
      el.style.height = `50px`;
      el.style.backgroundSize = "100%";
      el.style.display = "block";
      el.style.border = "none";
      el.style.borderRadius = "50%";
      el.style.cursor = "pointer";
      el.style.padding = '0';

      el.addEventListener("click", () => {
        window.alert(marker.properties.message);
      });

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates as [number, number])
        .addTo(mapRef.current);
    }
  }, []);

  return (
    <div
      style={{ height: "100%" }}
      className="map-container"
      ref={mapContainerRef}
    />
  );
};

export default Map;
