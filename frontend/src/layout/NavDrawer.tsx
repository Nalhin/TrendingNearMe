import React from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ChevronRight } from '@material-ui/icons';
import {
  ExitToApp,
  PersonAdd,
  MeetingRoom,
  History,
  Public,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { User } from '@/models/user.model';
import { useUser } from '@/hooks/useUser';

interface DrawerItem {
  text: string;
  icon: React.ReactElement;
  to: string;
  hide?: (user: User) => boolean
}

const drawerItems: DrawerItem[] = [
  {
    text: 'Map',
    icon: <Public/>,
    to: '/',
  },
  {
    text: 'Login',
    icon: <ExitToApp/>,
    to: '/login',
    hide: (user) => user.isAuthenticated,
  },
  {
    text: 'Sign up',
    icon: <PersonAdd/>,
    to: '/sign-up',
    hide: (user) => user.isAuthenticated,
  },
  {
    text: 'Personal history',
    icon: <History/>,
    to: '/personal-history',
    hide: (user) => !user.isAuthenticated,
  },
  {
    text: 'Logout',
    icon: <MeetingRoom/>,
    to: '/logout',
    hide: (user) => !user.isAuthenticated,
  },
];

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;

interface Props {
  isOpen: boolean;
  open: () => void;
}

const NavDrawer: React.FC<Props> = ({ isOpen, open }) => {
  const { user } = useUser();

  return (
    <Drawer variant="persistent" anchor="left" open={isOpen}>
      <div>
        <IconButton onClick={open}>
          <ChevronRight/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        {drawerItems.filter(item => !item.hide || !item.hide(user)).map((item) => (
          <StyledLink to={{ pathname: item.to }} key={item.text}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}/>
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
