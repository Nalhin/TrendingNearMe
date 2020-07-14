import React from 'react';
import { AnonymousUser, AuthenticatedUser, User } from '../models/User';
import { AuthUserResponseDto } from '../Api';
import { axios } from '../config/axios.config';
import { cookies } from '../config/cookies.config';
import { CookieTypes } from '../types/CookieTypes';
import { fetchMe } from '../api/userApi';

interface UserContextProps {
  user: User;
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

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>(new AnonymousUser());

  const authenticateUser = ({ user, token }: AuthUserResponseDto) => {
    cookies.setAuthCookie(token);
    setUser(new AuthenticatedUser(user));
  };

  const logoutUser = () => {
    cookies.removeAuthCookie();
    setUser(new AnonymousUser());
  };

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
