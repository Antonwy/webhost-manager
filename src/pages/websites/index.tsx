import * as React from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Layout from '../../components/Layout';
import { AppContext } from 'next/app';
import {
  Alert,
  Button,
  Fade,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateWebsiteModal from '../../components/create-website/CreateWebsiteDialog';
import StackModel from '../../models/stack';
import { API } from '../../api/API';
import StackItem from '../../components/websites/StackItem';
import { createContext, useState } from 'react';
import useSWR from 'swr';
import RequiresAuthentication from '../../components/RequiresAuthentication';

// export const getServerSideProps = async (context: AppContext) => {
//   try {
//     const data = await API.getStacks();
//     return { props: { data: data } };
//   } catch (error) {
//     console.log(error);
//     return { props: { data: [] } };
//   }
// };

type ReloadWebsitesContextType = () => void;
export const ReloadWebsitesContext = createContext<ReloadWebsitesContextType>(
  () => {}
);

type WebsitesSnackBarConfig = {
  message: string;
  severity: 'error' | 'info' | 'success' | 'warning';
};

const defaultSnackbarConfig: WebsitesSnackBarConfig = {
  message: 'Successfully created Website!',
  severity: 'success',
};

type WebsitesSnackBarContextType = (config: WebsitesSnackBarConfig) => void;
export const WebsitesSnackBarContext =
  createContext<WebsitesSnackBarContextType>((_) => {});

const Websites: NextPage = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const { stacks, loading, error, reload } = API.useGetStacks();

  const [snackBarConfig, setSnackBarConfig] = useState<WebsitesSnackBarConfig>(
    defaultSnackbarConfig
  );
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleOpenSnackBar = (config: WebsitesSnackBarConfig) => {
    setSnackBarConfig(config);
    return setShowSnackBar(true);
  };
  const handleCloseSnackBar = () => setShowSnackBar(false);

  return (
    <RequiresAuthentication>
      <Layout>
        <ReloadWebsitesContext.Provider value={reload}>
          <WebsitesSnackBarContext.Provider value={handleOpenSnackBar}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Stack
                sx={{ mb: 4 }}
                direction="row"
                spacing={3}
                alignItems="center"
              >
                <Typography variant="h5" component="h1">
                  Websites ({stacks.length})
                </Typography>
                <Button
                  onClick={handleOpenCreateModal}
                  startIcon={<Add />}
                  variant="contained"
                >
                  Create
                </Button>
                <CreateWebsiteModal
                  open={openCreateModal}
                  close={handleCloseCreateModal}
                />
              </Stack>
              <Grid container spacing={2} sx={{ width: '100%' }}>
                {stacks.map((stack) => (
                  <Grid key={stack.id} item>
                    <StackItem stack={stack}></StackItem>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              autoHideDuration={4000}
              open={showSnackBar}
              onClose={handleCloseSnackBar}
              TransitionComponent={Fade}
            >
              <Alert
                variant="filled"
                onClose={handleCloseSnackBar}
                severity={snackBarConfig?.severity}
              >
                {snackBarConfig?.message ?? defaultSnackbarConfig.message}
              </Alert>
            </Snackbar>
          </WebsitesSnackBarContext.Provider>
        </ReloadWebsitesContext.Provider>
      </Layout>
    </RequiresAuthentication>
  );
};

export default Websites;
