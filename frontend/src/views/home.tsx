import React from 'react';
import Map from '@/components/map';
import { useMutation } from 'react-query';
import { fetchGetTrendsByLocation } from '@/api/trends.api';
import { CoordinatesDto } from '@/Api';
import { LeafletMouseEvent } from 'leaflet';
import styled from '@emotion/styled';
import Trend from '@/components/trend';

const StyledContainer = styled.div`
  position: relative;
`;

const StyledPanel = styled.div`
  position:absolute;
  top:0;
  right:0;
  z-index: 1000;
  max-height: 100%;
    overflow:auto;

`;

const Home: React.FC = () => {
  const [mutate, { status, data, error }] = useMutation(
    fetchGetTrendsByLocation,
  );

  const [position] = React.useState<CoordinatesDto>({ lat: 31, lng: 23 });
  const [markers] = React.useState([]);

  const onClick = async (e: LeafletMouseEvent) => {
    const resp = await mutate(e.latlng);
  };

  return (
    <StyledContainer>
      <Map position={position} markers={markers} onClick={onClick}/>

      <StyledPanel>{data?.data.map((trend) =>
        <Trend key={trend.name} trend={trend}/>,
      )}
      </StyledPanel>
    </StyledContainer>
  );
};

export default Home;
