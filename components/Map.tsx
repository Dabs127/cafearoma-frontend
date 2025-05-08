import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";


const Map = () => {
    const mapContainerRef = useRef<any>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);    

    useEffect(() => {
        // console.log("Mapbox access token:", process.env.NEXT_PUBLIC_API_MAPBOX);
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_API_MAPBOX || "";
        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: [-99.1332, 19.4326], // Mexico City coordinates
          zoom: 12,
        });
      }, []);

    return (
        <div
        style={{ height: "100%" }}
        className="map-container"
        ref={mapContainerRef}
      />
    )
}

export default Map;