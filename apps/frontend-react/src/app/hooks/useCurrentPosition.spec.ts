import { renderHook } from '@testing-library/react-hooks';

import { useCurrentPosition } from './useCurrentPosition';

describe('useCurrentPosition hook', () => {
  it('should access current position', async () => {
    const position = { latitude: 12, longitude: 12 };
    const getCurrentPosition = (
      successCallback: (position: Position) => void,
    ) => {
      successCallback({ coords: position } as Position);
    };

    jest
      .spyOn(navigator.geolocation, 'getCurrentPosition')
      .mockImplementation(getCurrentPosition);

    const { result } = renderHook(() => useCurrentPosition());

    expect(result.current.position.lat).toBe(position.latitude);
    expect(result.current.position.lng).toBe(position.longitude);
  });
});
