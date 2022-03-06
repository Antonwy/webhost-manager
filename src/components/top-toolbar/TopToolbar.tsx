import { Menu, PowerSettingsNew, Search } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { API } from '../../api/API';
import Link from '../Link';
import ZoneSelect from './ZoneSelect';

type TopToolbarProps = {
  handleDrawerToggle: () => void;
};

const TopToolbar: React.FC<TopToolbarProps> = ({ handleDrawerToggle }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await API.signOut();
      console.log(res);
      router.push('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <Menu />
          </IconButton>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <Search />
          </IconButton>
        </div>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <ZoneSelect />
          </Box>

          <ButtonBase
            href="/account"
            LinkComponent={Link}
            sx={{ borderRadius: 70, p: 1 }}
          >
            <Avatar sx={{ width: 35, height: 35 }} />
          </ButtonBase>
          <Button
            sx={{ height: 40 }}
            color="error"
            variant="contained"
            startIcon={<PowerSettingsNew />}
            onClick={handleSignOut}
          >
            Logout
          </Button>
        </Stack>
      </Stack>
    </Toolbar>
  );
};

export default TopToolbar;
