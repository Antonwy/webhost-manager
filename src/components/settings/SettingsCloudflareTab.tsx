import { Sync } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { API } from '../../api/API';
import { ApiError } from '../../api/responses/apiError';
import { CloudflareDNSZone } from '../../models/cloudflare_dns_zone';
import DNSZone from '../../models/dns_zone';
import { useSnackbar } from '../SnackbarProvider';

const SettingsCloudflareTab: React.FC = () => {
  const { zones: cloudflareZones } = API.useCloudflareZones();
  const { zones, reload: reloadZones } = API.useZones();
  const [zoneLoading, setZoneLoading] = useState<string>();
  const [syncingZones, setSyncingZones] = useState(false);
  const snackbar = useSnackbar();

  const handleCheckedChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const checkedZone = cloudflareZones.filter((cz) => cz.id === target.id)[0];
    const zone = {
      id: checkedZone.id,
      name: checkedZone.name,
      syncedWithCloudflare: true,
    } as DNSZone;
    const create = target.checked;

    if (create) {
      try {
        setZoneLoading(checkedZone.id);
        await API.createZone(zone);

        await reloadZones();
        snackbar.success('Successfully added zone!');
      } catch (error) {
        if (error instanceof ApiError) snackbar.error(error.message);
        snackbar.error('Failed adding zone!');
      }
    } else {
      try {
        setZoneLoading(checkedZone.id);
        await API.removeZone(zone);

        await reloadZones();
        snackbar.success('Successfully removed zone!');
      } catch (error) {
        if (error instanceof ApiError) snackbar.error(error.message);
        snackbar.error('Failed removing zone!');
      }
    }

    setZoneLoading(undefined);
  };

  const syncZones = async (): Promise<void> => {
    try {
      setSyncingZones(true);
      await API.syncZones();

      await reloadZones();
      snackbar.success('Successfully synced zones!');
    } catch (error) {
      if (error instanceof ApiError) snackbar.error(error.message);
      snackbar.error('Failed syncing zones!');
    }

    setSyncingZones(false);
  };

  const isChecked = (zone: CloudflareDNSZone): boolean => {
    return zones.filter((z) => z.id === zone.id).length > 0;
  };

  return (
    <Grid container spacing={4} sx={{ p: 0, pb: 4, width: '100%' }}>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1">DNS Zones</Typography>
        <Typography variant="caption">
          Manage the Cloudflare DNS Zones that you want to sync with the
          webhosting tool.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={1}>
          {cloudflareZones.map((zone) => {
            const zoneInfo = {
              Owner: zone.owner.email,
              Nameserver: zone.name_servers.join(', '),
              'Original Name Server': zone.original_name_servers.join(', '),
            };

            const checked = isChecked(zone);
            const loading = zoneLoading === zone.id;

            return (
              <Card sx={{ px: 3, pt: 2, pb: 3 }} key={zone.id}>
                <Stack direction="row" spacing={2} alignItems="start">
                  <Checkbox
                    id={zone.id}
                    checked={checked}
                    onChange={handleCheckedChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />

                  <Stack
                    sx={{ flexGrow: 2, pt: 1, opacity: checked ? 1.0 : 0.5 }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ mb: 1 }} variant="subtitle1">
                        {zone.name}
                      </Typography>
                      {loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Sync color="success" />
                      )}
                    </Stack>
                    <Stack
                      divider={<Divider />}
                      spacing={1}
                      sx={{
                        color: 'gray',
                        mt: 1,
                      }}
                    >
                      {Object.entries(zoneInfo).map(([label, info]) => (
                        <Stack
                          key={label}
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Typography fontWeight="bold" variant="body2">
                            {label}:{' '}
                          </Typography>
                          <Typography variant="body2" textAlign="right">
                            {info}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="subtitle1">Sync DNS Zones</Typography>
        <Typography variant="caption">
          When you change your zones in cloudflare, you should also resync them
          here.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <LoadingButton
          loading={syncingZones}
          onClick={syncZones}
          variant="contained"
          color="secondary"
          startIcon={<Sync />}
        >
          Sync
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default SettingsCloudflareTab;
