import React from 'react';
import styled from '@emotion/styled';

import RouteView from '../router/RouteView';
import Navigation from './Navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
`;

const MainLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Navigation />
      <RouteView />
    </LayoutContainer>
  );
};

export default MainLayout;
