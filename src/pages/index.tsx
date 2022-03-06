import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WelcomeBack from '../assets/welcome-back.png';
import Image from 'next/image';
import RequiresAuthentication from '../components/RequiresAuthentication';
import {
  Card,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useTheme,
} from '@mui/material';
import { API } from '../api/API';
import { BackgroundBlob, SimpleBlob } from '../components/blobs/blob';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWordpress } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Home: NextPage = () => {
  const { stacks } = API.useGetStacks();
  const theme = useTheme();

  return (
    <RequiresAuthentication>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              p: 4,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              mb: 4,
            }}
          >
            <Stack
              alignItems="center"
              justifyContent="space-between"
              sx={{
                flexDirection: {
                  xs: 'column-reverse',
                  sm: 'row',
                },
              }}
            >
              <Stack>
                <Typography
                  sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                  variant="h3"
                  component="h1"
                >
                  Welcome back!
                </Typography>
                <Typography
                  sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                  variant="body1"
                  component="p"
                >
                  You have currently deployed{' '}
                  <b>
                    {stacks.length} page{stacks.length === 1 ? '' : 's'}
                  </b>
                  .
                </Typography>
                <List>
                  {stacks.map((s) => (
                    <ListItemButton
                      LinkComponent={Link}
                      href="/websites"
                      sx={{
                        color: 'white',
                        borderRadius: 1,
                      }}
                      key={s.id}
                    >
                      <ListItemIcon>
                        <FontAwesomeIcon
                          color={theme.palette.primary.contrastText}
                          fontSize={28}
                          icon={faWordpress}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontWeight: 'bold' }}
                        secondaryTypographyProps={{
                          color: 'primary.contrastText',
                        }}
                        secondary={s.url}
                      >
                        {s.name}
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </Stack>
              <BackgroundBlob
                sx={{
                  width: '100%',
                  height: 220,
                  maxWidth: 220,
                }}
                blob={<SimpleBlob />}
                position={{ right: 15 }}
              >
                <Image
                  layout="responsive"
                  src={WelcomeBack}
                  alt="Welcome back"
                />
              </BackgroundBlob>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </RequiresAuthentication>
  );
};

export default Home;
