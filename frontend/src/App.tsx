import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import { CssBaseline } from '@material-ui/core';
import { css, Global } from '@emotion/core';
import { UserProvider } from '@/hooks/useUser';

const App = () => {
  return (
    <div>
      <Global
        styles={css`
          html,
          body {
            height: 100%;
          }
        `}
      />
      <CssBaseline />
      <UserProvider>
        <Router>
          <MainLayout />
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
