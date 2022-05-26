import { FunctionComponent, useEffect, useRef } from "react";
import mapboxgl from 'mapbox-gl';
import "./UserLocationMap.css"

mapboxgl.accessToken = '';

type UserLocationMapProps = {
    latitude: number;
    longitude: number;
}

let mapMarkers: mapboxgl.Marker[] = [];

export const UserLocationMap: FunctionComponent<UserLocationMapProps> = ({ latitude, longitude }) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<any>(null);

    useEffect(() => {
        if (map.current) {
            map.current.flyTo({
                center: [
                    longitude,
                    latitude
                ],
                essential: true,
                speed: 4
            });
        } else {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longitude, latitude],
                zoom: 9
            });
        }

        mapMarkers.forEach((marker) => marker.remove());
        mapMarkers = [];

        let marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
        mapMarkers.push(marker);
    });

    return (
        <div ref={mapContainer} className="map-container" />
    );
}