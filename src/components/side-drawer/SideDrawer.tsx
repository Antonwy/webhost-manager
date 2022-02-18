import styled from '@emotion/styled';
import { Menu, Public } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
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
import { useState } from 'react';
import logo from '../../assets/logo.svg';
import UserContainer from '../UserContainer';
import DrawerItem, { DrawerItemProps } from './DrawerItem';

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
  { text: 'Home', icon: HomeIcon, route: '/' },
  { text: 'Websites', icon: Public, route: '/websites' },
];

const SideDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
        <Stack direction="row" alignItems="center" spacing={2}>
          <Image alt="Logo" src={logo} height={40} width={40} />
          <Typography component="h2" variant="h6">
            Webhost
          </Typography>
        </Stack>
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
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
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
            keepMounted: true, // Better open performance on mobile.
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
    </Box>
  );
};

export default SideDrawer;
