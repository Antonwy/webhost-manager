import styled from '@emotion/styled';
import {
  Dns,
  Home,
  Menu,
  Person,
  PowerSettingsNew,
  Public,
  Search,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import DrawerItem, { DrawerItemProps } from './side-drawer/DrawerItem';
import UserContainer from './UserContainer';
import logo from '../assets/logo.svg';
import { useTheme } from '@mui/system';
import { API } from '../api/API';
import { useRouter } from 'next/router';

export const drawerWidth = 300;

const MenuHeadline = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 8px;
  margin-top: 34px;
  margin-left: 16px;
  text-transform: uppercase;
`;

const PaddedUserContainer = styled.div`
  padding-top: 26px;
`;

const drawerItems: DrawerItemProps[] = [
  { text: 'Home', icon: Home, route: '/' },
  { text: 'Websites', icon: Public, route: '/websites' },
  { text: 'DNS', icon: Dns, route: '/dns' },
];

const Layout: React.FC = (props) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignOut = async () => {
    try {
      const res = await API.signOut();
      console.log(res);
      router.push('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  const drawer = (
    <Box sx={{ padding: 3, paddingTop: 2 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'left',
          padding: '0 !important',
        }}
      >
        <Image alt="Logo" src={logo} height={40} width={40} />
      </Toolbar>

      <PaddedUserContainer>
        <UserContainer />
      </PaddedUserContainer>

      <MenuHeadline variant="body1">General</MenuHeadline>

      <List>
        {drawerItems.map((p: DrawerItemProps) => (
          <DrawerItem
            key={p.text}
            text={p.text}
            icon={p.icon}
            route={p.route}
          />
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: 100,
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'transparent',
          color: theme.palette.grey[700],
        }}
        elevation={0}
      >
        <Toolbar sx={{ height: 100, px: 3 }}>
          <Stack
            sx={{ width: '100%' }}
            direction="row"
            justifyContent="space-between"
          >
            <div>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <Menu />
              </IconButton>
              <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
                <Search />
              </IconButton>
            </div>
            <div>
              <IconButton color="warning" onClick={handleSignOut}>
                <PowerSettingsNew />
              </IconButton>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pl: 3,
          pr: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ height: 100 }} />
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
