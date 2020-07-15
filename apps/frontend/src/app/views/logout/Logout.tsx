import React from 'react';
import { Typography } from '@material-ui/core';

import { useUser } from '../../hooks/useUser';

const Logout: React.FC = () => {
  const { logoutUser } = useUser();

  React.useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <Typography variant="h3" align="center">
      You have been logged off
    </Typography>
  );
};

export default Logout;
