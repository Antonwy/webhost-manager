import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SuperTokens from 'supertokens-auth-react';
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword';
import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import SignInImage from '../../assets/signin.webp';
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import { LoadingButton } from '@mui/lab';
import { SignInInput } from '../../api/requests/auth/SignInInput';
import { API } from '../../api/API';
import { useRouter } from 'next/router';
import { VpnKey } from '@mui/icons-material';

const defaultValues: SignInInput = {
  email: '',
  password: '',
};

export default function Auth() {
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { redirectToPath } = router.query;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const res = await API.signIn(formValues);
      console.log(res);

      if (redirectToPath && typeof redirectToPath === 'string') {
        router.push(redirectToPath);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
            xs: 'none',
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
          width: {
            xs: '100%',
            sm: '50%',
          },
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                name="email"
                label="Email"
                placeholder="musterman@gmail.com"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                required
              />
              <LoadingButton
                loadingPosition="start"
                startIcon={<VpnKey />}
                loading={false}
                type="submit"
                variant="contained"
                sx={{ height: 50 }}
              >
                SIGN IN
              </LoadingButton>
              <Typography color="gray" variant="caption">
                Learn how to get your password <Link>here</Link>.
              </Typography>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
}
