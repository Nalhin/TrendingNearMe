import React from 'react';

import { CoordinatesDto } from '@trends/data';

const CRACOW_COORDS = { lat: 50.049683, lng: 19.944544 };

export function useCurrentPosition(defaultPosition?: CoordinatesDto) {
  const [position, setPosition] = React.useState<CoordinatesDto>(
    defaultPosition ?? CRACOW_COORDS,
  );
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return { position };
}
