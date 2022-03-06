import { Add, Warning } from '@mui/icons-material';
import {
  Button,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
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
import { ApiError } from '../../api/responses/apiError';
import CreateDNSRecordModal from '../../components/create-dns-record/CreateDNSRecordDialog';
import DeleteButton from '../../components/DeleteButton';
import Layout from '../../components/Layout';
import RequiresAuthentication from '../../components/RequiresAuthentication';
import { useSnackbar } from '../../components/SnackbarProvider';
import { defaultSelectedZoneIdKey } from '../../components/top-toolbar/ZoneSelect';
import { CloudflareDNSZone } from '../../models/cloudflare_dns_zone';
import DNSZone from '../../models/dns_zone';

type DNSPageProps = {
  zones: CloudflareDNSZone[];
};

type ReloadRecordsContextType = () => void;
export const ReloadRecordsContext = createContext<ReloadRecordsContextType>(
  () => {}
);

const DNSPage: NextPage<DNSPageProps> = () => {
  const { zones } = API.useZones();
  const [selectedZoneId, setSelectedZoneId] = useState('');
  const snackbar = useSnackbar();

  const {
    records,
    loading: loadingRecords,
    error: recordsError,
    reload,
  } = API.useGetDNSRecords(selectedZoneId);

  useEffect(() => {
    if (!selectedZoneId) {
      const zoneId = localStorage.getItem(defaultSelectedZoneIdKey);

      if (!zoneId) return;

      setSelectedZoneId(zoneId);
    }
  }, [zones]);

  const handleChange = (event: SelectChangeEvent) => {
    const zone = zones.find((v) => v.id === event.target.value);
    if (zone) {
      setSelectedZoneId(zone.id);
    }
  };

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const handleDeleteRecord = async (recordId: string, zoneId: string) => {
    try {
      const res = await API.deleteDNSRecord(zoneId, recordId);
      reload();
      snackbar.success(res.message);
    } catch (err) {
      if (err instanceof ApiError) {
        snackbar.error(err.message);
      } else {
        snackbar.error('Internal Error');
      }
    }
  };

  return (
    <RequiresAuthentication>
      <ReloadRecordsContext.Provider value={reload}>
        <Stack spacing={2} sx={{ maxWidth: 'calc(100vw - 48px)' }}>
          <Typography variant="h5" component="h1">
            DNS Records
          </Typography>
          <Stack
            sx={{ mb: 4 }}
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{ marginBottom: 16 }}
          >
            <FormControl sx={{ width: { sm: 300, xs: 200 } }}>
              <InputLabel>Website</InputLabel>
              <Select
                value={selectedZoneId}
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
                disabled={!Boolean(selectedZoneId)}
              >
                Create
              </Button>
            </div>
          </Stack>
          <CreateDNSRecordModal
            open={openCreateModal}
            close={handleCloseCreateModal}
            zone={zones.find((z) => z.id === selectedZoneId)}
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
                    <TableCell align="right"></TableCell>
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
                  {!selectedZoneId ? (
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
                          color={rec.proxied ? 'secondary' : undefined}
                          label={rec.proxied ? 'Proxied' : 'Not Proxied'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <DeleteButton
                          handleDelete={() =>
                            handleDeleteRecord(rec.id, rec.zone_id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Stack>
      </ReloadRecordsContext.Provider>
    </RequiresAuthentication>
  );
};

export default DNSPage;
