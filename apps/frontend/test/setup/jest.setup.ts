import '@testing-library/jest-dom';
import { setConsole } from 'react-query';

const mockGeolocation = {
  getCurrentPosition: (successCallback: (position: Position) => void) => {
    successCallback({ coords: { latitude: 11, longitude: 11 } } as Position);
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.navigator.geolocation = mockGeolocation;

setConsole({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  log: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  warn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error: () => {},
});
