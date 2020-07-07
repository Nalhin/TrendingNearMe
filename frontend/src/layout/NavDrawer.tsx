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
import { ExitToApp, PersonAdd, MeetingRoom, History } from '@material-ui/icons';

interface DrawerItem {
  text: string;
  icon: React.ReactElement;
}

const drawerItems: DrawerItem[] = [
  {
    text: 'Login',
    icon: <ExitToApp />,
  },
  {
    text: 'Sign up',
    icon: <PersonAdd />,
  },
  {
    text: 'Personal history',
    icon: <History />,
  },
  {
    text: 'Logout',
    icon: <MeetingRoom />,
  },
];

interface Props {
  isOpen: boolean;
  open: () => void;
}

const NavDrawer: React.FC<Props> = ({ isOpen, open }) => {
  return (
    <Drawer variant="persistent" anchor="left" open={isOpen}>
      <div>
        <IconButton onClick={open}>
          <ChevronRight />
        </IconButton>
      </div>
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
