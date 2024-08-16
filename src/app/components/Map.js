"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" }
];
const initialPosition = markers[0].position;

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState(initialPosition);
  const [LInstance, setLInstance] = useState(null);

  useEffect(() => {
    import('leaflet').then((L) => {
      setLInstance(L);
    });
  }, []);

  const CenterMap = ({ center }) => {
    const map = useMap();    
    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
  };

  const handleMarkerClick = (position) => {
    setMapCenter(position);
    console.log(position);
    
  };

  const customIcon = LInstance ? new LInstance.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  }) : null;

  return (
    <MapContainer
      center={mapCenter}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          icon={customIcon}
          eventHandlers={{
            click: () => handleMarkerClick(marker.position),
          }}
        >
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
      <CenterMap center={mapCenter} />
    </MapContainer>
  );
};

export default MapComponent;
