import React from 'react';
import Map from '@/components/Map';
import { useMutation } from 'react-query';
import { fetchGetTrendsByLocation } from '@/api/trendsApi';
import { LeafletMouseEvent } from 'leaflet';
import styled from '@emotion/styled';
import Trend from '@/components/Trend';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';

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

  const onClick = async (e: LeafletMouseEvent) => {
    await mutate(e.latlng);
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
