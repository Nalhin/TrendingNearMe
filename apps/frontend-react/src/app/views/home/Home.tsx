import React from 'react';
import { useQuery } from 'react-query';
import { LeafletMouseEvent } from 'leaflet';
import styled from '@emotion/styled';

import { CoordinatesDto } from '@trends/data';

import { useCurrentPosition } from '../../hooks/useCurrentPosition';
import { fetchGetTrendsByLocation } from '../../api/trends.api';
import Trend from '../../components/Trend';
import Map from '../../components/Map';
import MapMarker from '../../components/MapMarker';

const StyledContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const StyledPanel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
  max-height: 100%;
  overflow: auto;
`;

const Home: React.FC = () => {
  const [markerPosition, setMarkerPosition] = React.useState(
    null as CoordinatesDto,
  );
  const { data } = useQuery(
    [markerPosition, 'location'],
    fetchGetTrendsByLocation,
    { enabled: markerPosition },
  );
  const { position } = useCurrentPosition();

  const onClick = (event: LeafletMouseEvent) => {
    setMarkerPosition(event.latlng);
  };

  return (
    <StyledContainer>
      <Map
        position={position}
        onClick={onClick}
        markers={
          markerPosition && (
            <MapMarker position={markerPosition}>
              Current search position
            </MapMarker>
          )
        }
      />
      <StyledPanel>
        {data?.data.map((trend) => (
          <Trend key={trend.name} trend={trend} />
        ))}
      </StyledPanel>
    </StyledContainer>
  );
};

export default Home;
