import React from 'react';

import { AnonymousUser, AuthenticatedUser, UserModel } from '@trends/data';
import { AuthUserResponseDto } from '@trends/data';

import { cookies } from '../config/cookies.config';
import { fetchMe } from '../api/user.api';

export interface UserContextProps {
  user: UserModel;
  authenticateUser: (user: AuthUserResponseDto) => void;
  logoutUser: () => void;
}

const UserContext = React.createContext({} as UserContextProps);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
};

interface Props {
  defaultUser?: AnonymousUser | AuthenticatedUser;
}

export const useUserProviderState = (
  defaultUser: UserModel = new AnonymousUser(),
) => {
  const [user, setUser] = React.useState<UserModel>(defaultUser);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
      const token = cookies.getAuthCookie();
      if (!user.isAuthenticated && token) {
        try {
          const resp = await fetchMe();
          setUser(new AuthenticatedUser(resp.data));
        } catch (e) {
          cookies.removeAuthCookie();
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return { authenticateUser, user, logoutUser, isLoading };
};

export const UserProvider: React.FC<Props> = ({
  children,
  defaultUser = new AnonymousUser(),
} = {}) => {
  const { isLoading, ...provider } = useUserProviderState(defaultUser);
  return (
    <UserContext.Provider value={provider}>
      {!isLoading ? children : null}
    </UserContext.Provider>
  );
};
