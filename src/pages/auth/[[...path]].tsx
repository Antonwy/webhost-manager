import React, { useEffect, useState } from 'react';
import SuperTokens from 'supertokens-auth-react';
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword';
import {
  Box,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import SignInImage from '../../assets/authentication.png';
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import { LoadingButton } from '@mui/lab';
import { SignInInput } from '../../api/requests/auth/SignInInput';
import { API } from '../../api/API';
import { useRouter } from 'next/router';
import { VpnKey } from '@mui/icons-material';
import { useSnackbar } from '../../components/SnackbarProvider';
import { ApiError } from '../../api/responses/apiError';
import { BackgroundBlob, SimpleBlob } from '../../components/blobs/blob';

const defaultValues: SignInInput = {
  email: '',
  password: '',
};

const Auth = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { redirectToPath } = router.query;
  const snackbar = useSnackbar();
  const theme = useTheme();

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

      snackbar.success('Successfully logged in!');

      if (redirectToPath && typeof redirectToPath === 'string') {
        router.push(redirectToPath);
      } else {
        router.push('/');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        snackbar.error(error.message);
      } else {
        console.log(error);
        snackbar.error('Internal Server Error');
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          bgcolor: 'primary.light',
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
          <BackgroundBlob
            sx={{
              width: '100%',
              maxWidth: 500,
            }}
            blob={<SimpleBlob color={theme.palette.primary.main} />}
            position={{
              top: -120,
              left: -10,
            }}
          >
            <Image layout="responsive" src={SignInImage} alt="signin image" />
          </BackgroundBlob>
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
                  color="secondary"
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
    </div>
  );
};

export default Auth;
