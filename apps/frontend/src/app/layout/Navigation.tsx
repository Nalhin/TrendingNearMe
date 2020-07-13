import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import NavDrawer from './NavDrawer';

const Navigation = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerChange = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" onClick={handleDrawerChange} edge="start">
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap>
          Trends near me!
        </Typography>
      </Toolbar>
      <NavDrawer isOpen={isDrawerOpen} open={handleDrawerChange} />
    </AppBar>
  );
};

export default Navigation;
