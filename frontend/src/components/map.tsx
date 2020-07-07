import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker } from '@/types/map-marker';
import { CoordinatesDto } from '@/Api';

interface Props {
  markers: MapMarker[];
  position: CoordinatesDto;
  onClick: (e: any) => void;
}

const Map: React.FC<Props> = ({ markers, position, onClick }) => {
  return (
    <LeafletMap
      center={position}
      zoom={13}
      style={{ height: '100vh' }}
      onClick={onClick}
      doubleClickZoom={false}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, i) => (
        <Marker position={marker.position} key={i}>
          <Popup>Example</Popup>
        </Marker>
      ))}
    </LeafletMap>
  );
};

export default Map;
