import * as React from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Layout from '../../components/Layout';
import { Button, Fab, Grid, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import CreateWebsiteModal from '../../components/create-website/CreateWebsiteDialog';
import { API } from '../../api/API';
import StackItem from '../../components/websites/StackItem';
import { createContext } from 'react';
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

const Websites: NextPage = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const { stacks, reload } = API.useGetStacks();

  return (
    <RequiresAuthentication>
      <ReloadWebsitesContext.Provider value={reload}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Stack sx={{ mb: 4 }} direction="row" spacing={3} alignItems="center">
            <Typography variant="h4" component="h1">
              Websites ({stacks.length})
            </Typography>
            <Fab
              size="medium"
              color="secondary"
              onClick={handleOpenCreateModal}
            >
              <Add />
            </Fab>
            <CreateWebsiteModal
              open={openCreateModal}
              close={handleCloseCreateModal}
            />
          </Stack>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            {stacks.map((stack) => (
              <Grid key={stack.id} item xs={12} sm={6} lg={4} xl={3}>
                <StackItem stack={stack}></StackItem>
              </Grid>
            ))}
          </Grid>
        </Box>
      </ReloadWebsitesContext.Provider>
    </RequiresAuthentication>
  );
};

export default Websites;
