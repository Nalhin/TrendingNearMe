import React from 'react';
import Map from '@/components/map';
import { MapPosition } from '@/types/map-position';


const Home: React.FC = () => {
  const [position] = React.useState([20, 20] as MapPosition);
  const [markers] = React.useState([]);


  return <Map position={position} markers={markers}/>;
};

export default Home;
