import React from 'react';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';

import {
  fetchGetTrendDetailsId,
  fetchGetTrendsHistory,
} from '../../api/trends.api';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';
import MapMarker from '../../components/MapMarker';
import Map from '../../components/Map';
import Trend from '../../components/Trend';
import { toRelativeDate } from '@trends/data';
import { useParams, useLocation, useHistory } from 'react-router-dom';

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

const PersonalHistory: React.FC = () => {
  const { detailsId } = useParams<{ detailsId: string }>();
  const { data: trendHistory } = useQuery(
    'personal-history',
    fetchGetTrendsHistory,
    { retry: false },
  );
  const { data: trendDetails } = useQuery(
    [detailsId, 'marker'],
    fetchGetTrendDetailsId,
    { enabled: detailsId },
  );
  const { position } = useCurrentPosition();
  const history = useHistory();

  const onMarkerClick = (clickedId: string) => {
    history.push(`./${clickedId}`);
  };

  const onMarkerClose = () => {
    history.push('.');
  };

  const markers = React.useMemo(() => {
    return trendHistory?.data.map(({ _id, coordinates, created }) => (
      <MapMarker
        key={_id}
        id={_id}
        onPopupClose={onMarkerClose}
        onPopupOpen={onMarkerClick}
        position={coordinates}
      >
        <div>{toRelativeDate(created)}</div>
      </MapMarker>
    ));
  }, [trendHistory]);

  return (
    <StyledContainer>
      <Map position={position} markers={markers} />
      <StyledPanel>
        {trendDetails?.data.trends.map((trend) => (
          <Trend key={trend.name} trend={trend} />
        ))}
      </StyledPanel>
    </StyledContainer>
  );
};
export default PersonalHistory;
