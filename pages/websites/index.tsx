import * as React from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Layout from '../../components/Layout';
import { getContainers } from '../../src/API';
import { AppContext } from 'next/app';
import { Container } from '../../src/models/container';
import { Button, Card, Grid, Modal, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import CreateWebsiteModal from '../../components/CreateWebsite/CreateWebsiteModal';

export const getServerSideProps = async (context: AppContext) => {
  const data = await getContainers();

  return { props: { data: data } };
};

type WebsitesProps = {
  data: Container[];
};

const DockerContainerItem = styled(Card)`
  padding: 12px;
  min-width: 300px;
`;

const nameFromNames = (names: string[]): string => {
  if (names && names[0]) {
    const name = names[0].slice(1);

    return name[0].toUpperCase() + name.slice(1);
  }

  return 'No name';
};

const Websites: NextPage<WebsitesProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Layout>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          padding: 3,
        }}
      >
        <Stack sx={{ mb: 2 }} direction="row" spacing={2} alignItems="center">
          <Typography variant="h5" component="h1">
            Websites
          </Typography>
          <Button onClick={handleOpen} startIcon={<Add />} variant="contained">
            Create
          </Button>
          <CreateWebsiteModal open={open} close={handleClose} />
        </Stack>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {data?.map((c) => (
            <Grid key={c.Id} item>
              <DockerContainerItem variant="outlined">
                <Typography variant="h6">{nameFromNames(c.Names)}</Typography>
                <Typography variant="caption">
                  <b>Image:</b> {c.Image}
                </Typography>
              </DockerContainerItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Websites;
