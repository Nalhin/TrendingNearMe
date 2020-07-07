import React from 'react';
import RouteView from '@/router/RouteView';
import Navigation from '@/layout/Navigation';
import styled from '@emotion/styled';

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
