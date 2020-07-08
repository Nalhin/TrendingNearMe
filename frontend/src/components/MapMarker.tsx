import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { CoordinatesDto } from '@/Api';

interface Props {
  onPopupClose?: () => void;
  onPopupOpen?: (id: string) => void
  position: CoordinatesDto;
  id: string
}

const MapMarker: React.FC<Props> = ({ children, id, position, onPopupClose, onPopupOpen }) => {
  const onPopupOpenFn = () => {
    if (onPopupOpen) {
      onPopupOpen(id);
    }
  };


  return (
    <Marker position={position}>
      <Popup onOpen={onPopupOpenFn} onClose={onPopupClose}>{children}</Popup>
    </Marker>
  );
};

export default MapMarker;