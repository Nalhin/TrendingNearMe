import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteView from '@/router/RouteView';

const App = () => {
  return (
    <div>
      Hello world
      <Router>
        <RouteView />
      </Router>
    </div>
  );
};

export default App;
