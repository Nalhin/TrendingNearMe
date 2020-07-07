import React from 'react';
import { AnonymousUser, AuthenticatedUser, User } from '@/models/user.model';
import { AuthUserResponseDto } from '@/Api';

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

  const authenticateUser = (user: AuthUserResponseDto) => {
    setUser(new AuthenticatedUser(user));
  };

  const logoutUser = () => {
    setUser(new AnonymousUser());
  };

  return (
    <UserContext.Provider value={{ authenticateUser, user, logoutUser }}>
      {' '}
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
