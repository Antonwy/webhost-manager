import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import SideDrawer, { drawerWidth } from './SideDrawer/SideDrawer';

const Layout: React.FC = (props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <SideDrawer />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
        }}
      >
        <AppBar sx={{ bgcolor: 'white', boxShadow: 'none' }}>
          <Toolbar
            sx={{
              height: 90,
              marginLeft: `${drawerWidth}px`,
            }}
          >
            <Typography color="black" variant="h6" component="div">
              Search
            </Typography>
          </Toolbar>
        </AppBar>
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
