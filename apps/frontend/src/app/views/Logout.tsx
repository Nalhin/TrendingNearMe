import React from 'react';
import { useUser } from '../hooks/useUser';


const Logout: React.FC = () => {
  const { logoutUser } = useUser();

  React.useEffect(() => {
    logoutUser();
  }, []);

  return (
    <h1>
      You have been logged off
    </h1>
  );
};

export default Logout;
