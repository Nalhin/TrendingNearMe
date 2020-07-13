import React from 'react';

import { CoordinatesDto } from '../Api';

export function useCurrentPosition(defaultPosition?: CoordinatesDto) {
  const [position, setPosition] = React.useState<CoordinatesDto>(
    defaultPosition || ((null as unknown) as CoordinatesDto),
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
