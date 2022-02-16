import { Search } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import * as React from 'react';
import SideDrawer, { drawerWidth } from './SideDrawer/SideDrawer';

const Layout: React.FC = (props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideDrawer />
      <AppBar sx={{ bgcolor: 'white', boxShadow: 'none' }}>
        <Toolbar
          sx={{
            height: 90,
            marginLeft: `${drawerWidth}px`,
          }}
        >
          <IconButton sx={{ mr: 1 }}>
            <Search color="primary" />
          </IconButton>
          <Typography color="black" variant="h6" component="div">
            Search
          </Typography>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          mt: '90px',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
