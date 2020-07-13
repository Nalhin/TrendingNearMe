import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { CoordinatesDto } from '../Api';
import { LeafletMouseEvent } from 'leaflet';

interface Props {
  markers?: JSX.Element | JSX.Element[];
  position: CoordinatesDto;
  onClick?: (event: LeafletMouseEvent) => void;
}

const Map: React.FC<Props> = ({ markers = [], position, onClick }) => {
  return (
    <LeafletMap
      center={position}
      zoom={13}
      style={{
        width: '100%',
        height: '100%',
      }}
      onClick={onClick}
      doubleClickZoom={false}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </LeafletMap>
  );
};

export default Map;
