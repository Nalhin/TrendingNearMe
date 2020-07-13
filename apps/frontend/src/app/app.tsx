import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { css, Global } from '@emotion/core';

import { UserProvider } from './hooks/useUser';
import MainLayout from './layout/MainLayout';

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
