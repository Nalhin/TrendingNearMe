import React from 'react';

import { AnonymousUser, AuthenticatedUser, UserModel } from '@trends/data';
import { AuthUserResponseDto } from '@trends/data';

import { cookies } from '../config/cookies.config';
import { CookieTypes } from '../types/cookie.types';
import { fetchMe } from '../api/user.api';

export interface UserContextProps {
  user: UserModel;
  authenticateUser: (user: AuthUserResponseDto) => void;
  logoutUser: () => void;
}

const UserContext = React.createContext({} as UserContextProps);

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

interface Props {
  defaultUser?: AnonymousUser | AuthenticatedUser;
}

const UserProvider: React.FC<Props> = ({
  children,
  defaultUser = new AnonymousUser(),
} = {}) => {
  const [user, setUser] = React.useState<UserModel>(defaultUser);

  const authenticateUser = React.useCallback(
    ({ user, token }: AuthUserResponseDto) => {
      cookies.setAuthCookie(token);
      setUser(new AuthenticatedUser(user));
    },
    [],
  );

  const logoutUser = React.useCallback(() => {
    cookies.removeAuthCookie();
    setUser(new AnonymousUser());
  }, []);

  React.useEffect(() => {
    (async () => {
      const token = cookies.get(CookieTypes.AUTH);
      if (token) {
        try {
          const resp = await fetchMe();
          setUser(new AuthenticatedUser(resp.data));
        } catch (e) {
          logoutUser();
        }
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ authenticateUser, user, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
