import React from 'react';
import { useMutation } from 'react-query';
import { LeafletMouseEvent } from 'leaflet';
import styled from '@emotion/styled';

import { useCurrentPosition } from '../hooks/useCurrentPosition';
import { fetchGetTrendsByLocation } from '../api/trendsApi';
import Trend from '../components/Trend';
import Map from '../components/Map';

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
  const [mutate, { data }] = useMutation(fetchGetTrendsByLocation);
  const { position } = useCurrentPosition();

  const onClick = async (event: LeafletMouseEvent) => {
    await mutate(event.latlng);
  };

  return (
    <StyledContainer>
      <Map position={position} onClick={onClick} />
      <StyledPanel>
        {data?.data.map((trend) => (
          <Trend key={trend.name} trend={trend} />
        ))}
      </StyledPanel>
    </StyledContainer>
  );
};

export default Home;
