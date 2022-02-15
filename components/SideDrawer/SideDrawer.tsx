import styled from '@emotion/styled';
import { Public } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { Drawer, Stack, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../../src/assets/logo.svg';
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
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: drawerWidth,
        height: '100vh',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          padding: 3,
          paddingTop: 2,
        },
      }}
    >
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

      <Stack spacing={1}>
        {drawerItems.map((p: DrawerItemProps) => (
          <DrawerItem key={p.text} {...p} />
        ))}
      </Stack>
    </Drawer>
  );
};

export default SideDrawer;
