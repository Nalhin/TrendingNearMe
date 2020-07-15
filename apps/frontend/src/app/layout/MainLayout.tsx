import React from 'react';
import styled from '@emotion/styled';

import RouteView from '../router/RouteView';
import Navigation from './Navigation';
import { useIsFetching } from 'react-query';
import { LinearProgress } from '@material-ui/core';

const LayoutContainer = styled.div`
  min-height: 100vh;
`;

const StyledRelativeContainer = styled.div`
  position: relative;
`;

const StyledLinearProgress = styled(LinearProgress)`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
`;

const MainLayout: React.FC = () => {
  const isFetching = useIsFetching();
  return (
    <LayoutContainer>
      <Navigation />
      <StyledRelativeContainer>
        {isFetching ? (
          <StyledLinearProgress variant="indeterminate" color="secondary" />
        ) : null}
        <RouteView />
      </StyledRelativeContainer>
    </LayoutContainer>
  );
};

export default MainLayout;
