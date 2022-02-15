import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../../components/Layout';

const Websites: NextPage = () => {
  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>Websites</Typography>
      </Box>
    </Layout>
  );
};

export default Websites;
