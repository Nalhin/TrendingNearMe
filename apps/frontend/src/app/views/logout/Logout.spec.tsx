import React from 'react';

import Logout from './Logout';
import { renderWithProviders } from '../../../../test/utils/render-with-providers';
import * as userHook from '../../hooks/useUser';
import { UserContextProps } from '../../hooks/useUser';

describe('Logout Page', () => {
  it('should logoutUser on enter', () => {
    const logoutUser = jest.fn();
    jest
      .spyOn(userHook, 'useUser')
      .mockReturnValue(({ logoutUser } as unknown) as UserContextProps);

    renderWithProviders(<Logout />);

    expect(logoutUser).toBeCalledTimes(1);
  });
});
