import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from '../components/Layout';
import Empty from '../src/assets/empty.webp';
import Image from 'next/image';

const Home: NextPage = () => {
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
        <Box
          sx={{
            width: '300px',
            height: '300px',
          }}
        >
          <Image layout="responsive" src={Empty} alt="Empty illustration" />
        </Box>
        <Typography>👀 Looks really empty here...</Typography>
      </Box>
    </Layout>
  );
};

export default Home;
