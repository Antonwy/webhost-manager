import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SignInImage from '../../assets/signin.webp';
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import { Button, Card, Link, Stack, TextField } from '@mui/material';

const SignIn: NextPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        bgcolor: '#8095ff',
      }}
    >
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: {
            sm: 'flex',
          },
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            width: '50%',
          }}
        >
          <Image layout="responsive" src={SignInImage} alt="signin image" />
        </Box>
      </Box>
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          sx={{
            p: 4,
          }}
          component={Card}
          spacing={2}
        >
          <Stack alignItems="center" spacing={2}>
            <Box
              sx={{
                width: '60px',
                height: '60px',
              }}
            >
              <Image layout="responsive" src={Logo} alt="Logo" />
            </Box>
            <Typography variant="h4">Welcome 🎉</Typography>
          </Stack>
          <form>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                name="email"
                label="Email"
                placeholder="musterman@gmail.com"
                // value={formValues.name}
                // onChange={handleInputChange}
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                // value={formValues.name}
                // onChange={handleInputChange}
                required
              />
              <Button sx={{ height: 50 }} variant="contained">
                Sign In
              </Button>
              <Typography color="gray" variant="caption">
                Learn how to get your password <Link>here</Link>.
              </Typography>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignIn;
