import { Add, Warning } from '@mui/icons-material';
import {
  Alert,
  Button,
  Card,
  Chip,
  CircularProgress,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { AppContext } from 'next/app';
import { NextPage } from 'next/types';
import { createContext, useEffect, useState } from 'react';
import { API } from '../../api/API';
import CreateDNSRecordModal from '../../components/create-dns-record/CreateDNSRecordDialog';
import Layout from '../../components/Layout';
import RequiresAuthentication from '../../components/RequiresAuthentication';
import { DNSZone } from '../../models/dns_zone';

const defaultDnsZoneIdKey = 'default_dns_zone_key';

type DNSPageProps = {
  zones: DNSZone[];
};

type ReloadRecordsContextType = () => void;
export const ReloadRecordsContext = createContext<ReloadRecordsContextType>(
  () => {}
);

type RecordsSnackBarConfig = {
  message: string;
  severity: 'error' | 'info' | 'success' | 'warning';
};

const defaultSnackbarConfig: RecordsSnackBarConfig = {
  message: 'Successfully created DNS record!',
  severity: 'success',
};

type RecordsSnackBarContextType = (config: RecordsSnackBarConfig) => void;
export const RecordsSnackBarContext = createContext<RecordsSnackBarContextType>(
  (_) => {}
);

export const getServerSideProps = async (context: AppContext) => {
  const res = await axios.get('/zones');

  return {
    props: { zones: res?.data?.data ?? [] },
  };
};

const DNSPage: NextPage<DNSPageProps> = ({ zones }) => {
  const [selectedZone, setSelectedZone] = useState<DNSZone>(zones[0]);

  const {
    records,
    loading: loadingRecords,
    error: recordsError,
    reload,
  } = API.useGetDNSRecords(selectedZone?.id);

  const handleChange = (event: SelectChangeEvent) => {
    const zone = zones.find((v) => v.id === event.target.value);
    if (zone) {
      setSelectedZone(zone);
    }
  };

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const [snackBarConfig, setSnackBarConfig] = useState<RecordsSnackBarConfig>(
    defaultSnackbarConfig
  );
  const [showSnackBar, setShowSnackBar] = useState(false);

  const handleOpenSnackBar = (config: RecordsSnackBarConfig) => {
    setSnackBarConfig(config);
    return setShowSnackBar(true);
  };
  const handleCloseSnackBar = () => setShowSnackBar(false);

  return (
    <RequiresAuthentication>
      <Layout>
        <ReloadRecordsContext.Provider value={reload}>
          <RecordsSnackBarContext.Provider value={handleOpenSnackBar}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h1">
                DNS Records
              </Typography>
              <Stack
                sx={{ mb: 4 }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                style={{ marginBottom: 16 }}
              >
                <FormControl sx={{ width: 300 }}>
                  <InputLabel>Website</InputLabel>
                  <Select
                    value={selectedZone?.id}
                    label="Website"
                    onChange={handleChange}
                  >
                    {zones.map((z) => (
                      <MenuItem key={z.id} value={z.id}>
                        {z.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div>
                  <Button
                    onClick={handleOpenCreateModal}
                    startIcon={<Add />}
                    variant="contained"
                    disabled={!Boolean(selectedZone)}
                  >
                    Create Record
                  </Button>
                </div>
              </Stack>
              <CreateDNSRecordModal
                open={openCreateModal}
                close={handleCloseCreateModal}
                zone={selectedZone}
              />
              <TableContainer
                style={{ marginBottom: 24 }}
                sx={{ mb: 4, px: 2, py: 3 }}
                component={Card}
              >
                <Table>
                  {!loadingRecords && (
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Content</TableCell>
                        <TableCell align="right">Proxied</TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {loadingRecords ? (
                    <Stack
                      sx={{ p: 4, width: '100%' }}
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      {!selectedZone ? (
                        <>
                          <Warning color="primary" fontSize="large" />
                          <Typography>Please select a Website!</Typography>
                        </>
                      ) : (
                        <>
                          {' '}
                          <CircularProgress />
                          <Typography>Loading Records...</Typography>
                        </>
                      )}
                    </Stack>
                  ) : (
                    <TableBody>
                      {records.map((rec) => (
                        <TableRow
                          key={rec.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell
                            sx={{ fontWeight: 'bold', color: 'primary.main' }}
                          >
                            {rec.type}
                          </TableCell>
                          <TableCell align="right">{rec.name}</TableCell>
                          <TableCell align="right">{rec.content}</TableCell>
                          <TableCell align="right">
                            <Chip
                              color={rec.proxied ? 'primary' : undefined}
                              label={rec.proxied ? 'Proxied' : 'Not Proxied'}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
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
            </Stack>
          </RecordsSnackBarContext.Provider>
        </ReloadRecordsContext.Provider>
      </Layout>
    </RequiresAuthentication>
  );
};

export default DNSPage;
