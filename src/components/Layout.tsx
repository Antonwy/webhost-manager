import styled from '@emotion/styled';
import { Dns, Home, Person, Public, Settings } from '@mui/icons-material';
import { AppBar, Box, Drawer, List, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import DrawerItem, { DrawerItemProps } from './side-drawer/DrawerItem';
import UserContainer from './UserContainer';
import logo from '../assets/logo.svg';
import { useTheme } from '@mui/system';
import TopToolbar from './top-toolbar/TopToolbar';
import { useRouter } from 'next/router';
import ZoneSelect from './top-toolbar/ZoneSelect';

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

const generalDrawerItems: DrawerItemProps[] = [
  { text: 'Home', icon: Home, route: '/' },
  { text: 'Websites', icon: Public, route: '/websites' },
  { text: 'DNS', icon: Dns, route: '/dns' },
];

const settingsDrawerItems: DrawerItemProps[] = [
  { text: 'Account', icon: Person, route: '/account' },
  { text: 'Settings', icon: Settings, route: '/settings' },
];

const pagesWithoutLayout = ['/auth'];

const Layout: React.FC = (props) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (pagesWithoutLayout.filter((p) => router.asPath.startsWith(p)).length > 0)
    return <div>{props.children}</div>;

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

      <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 3, width: '100%' }}>
        <ZoneSelect />
      </Box>

      <List>
        <MenuHeadline variant="body1">General</MenuHeadline>
        {generalDrawerItems.map((p: DrawerItemProps) => (
          <DrawerItem
            key={p.text}
            text={p.text}
            icon={p.icon}
            route={p.route}
          />
        ))}

        <MenuHeadline variant="body1">Settings</MenuHeadline>
        {settingsDrawerItems.map((p: DrawerItemProps) => (
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
        <TopToolbar handleDrawerToggle={handleDrawerToggle} />
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
