import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API } from '../api/API';
import DNSZone from '../models/dns_zone';
import CreateSubdomainDialog from './create-dns-record/CreateSubdomainDialog';
import { defaultSelectedZoneIdKey } from './top-toolbar/ZoneSelect';

export type DomainInputChangeEvent = (domain: string) => void;
type DomainInputProps = {
  onChange: DomainInputChangeEvent;
  setCanSubmit: (submit: boolean) => void;
};

const DomainInput: React.FC<DomainInputProps> = ({
  onChange,
  setCanSubmit,
}) => {
  const { zones } = API.useZones();
  const [selectedZone, setSelectedZone] = useState<DNSZone>();
  const [subdomain, setSubdomainDomain] = useState('');
  const [withSubdomain, setWithSubdomain] = useState(true);
  const { records, reload: reloadRecords } = API.useGetDNSRecords(
    selectedZone?.id
  );

  const subdomains = records.filter(
    (sd) => sd.type === 'A' && !sd.name.startsWith('www')
  );

  useEffect(() => {
    const zoneId = localStorage.getItem(defaultSelectedZoneIdKey);

    if (zoneId && !selectedZone) {
      const zone = zones.find((z) => z.id === zoneId);
      setSelectedZone(zone);
    }
  }, [zones]);

  const handleChange = (value: string, isZone: boolean = true) => {
    console.log(value);
    if (!value) return;

    if (isZone) {
      if (!selectedZone) return;

      const zone = zones.find((z) => z.id === value);

      onChange(`${subdomain}.${selectedZone.name}`);
      setSelectedZone(zone);
    } else {
      if (!selectedZone) return;

      onChange(`${value}.${selectedZone.name}`);
      setSubdomainDomain(value);
    }
  };

  const handleWithSubdomainChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWithSubdomain(event.target.checked);
    if (!selectedZone) return;

    if (event.target.checked) {
      onChange(`${subdomain}.${selectedZone.name}`);
    } else {
      onChange(selectedZone.name);
    }
  };

  const [openCreateSubdomainModal, setOpenCreateSubdomainModal] =
    useState(false);
  const handleOpenCreateSubdomainModal = () => {
    setOpenCreateSubdomainModal(true);
    setCanSubmit(false);
  };
  const handleCloseCreateSubdomainModal = () => {
    setOpenCreateSubdomainModal(false);
    setCanSubmit(true);
  };

  return (
    <Card component={Stack} spacing={2} sx={{ p: 2, pb: 1.5 }}>
      <div>
        <Typography variant="subtitle2">Select Domain</Typography>
        <Typography variant="caption">
          Select the domain you want to deploy your app. Choose between a
          top-level domain, or a subdomain.
        </Typography>
      </div>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="stretch"
        alignItems="baseline"
        sx={{ pt: 1 }}
      >
        {withSubdomain ? (
          <>
            <FormControl>
              <InputLabel>Subdomain</InputLabel>
              <Select
                onChange={(event) => handleChange(event.target.value, false)}
                value={subdomain}
                label="Subdomain"
                sx={{ minWidth: 125 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subdomains.map((sd) => {
                  const sub = sd.name.split('.')[0];
                  return (
                    <MenuItem key={sd.id} value={sub}>
                      {sub}
                    </MenuItem>
                  );
                })}
                <Box sx={{ m: 2 }}>
                  <Button
                    onClick={handleOpenCreateSubdomainModal}
                    sx={{ width: '100%' }}
                    variant="contained"
                    startIcon={<Add />}
                    color="secondary"
                  >
                    Create
                  </Button>
                </Box>
              </Select>
            </FormControl>
            <Typography>.</Typography>
          </>
        ) : (
          <></>
        )}
        <FormControl sx={{ flexGrow: 2 }}>
          <InputLabel>Domain</InputLabel>
          <Select
            onChange={(event) => handleChange(event.target.value)}
            value={selectedZone?.id ?? ''}
            label="Domain"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {zones.map((z) => (
              <MenuItem key={z.id} value={z.id}>
                {z.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <FormControlLabel
        control={<Checkbox onChange={handleWithSubdomainChange} />}
        label="Is Subdomain?"
        checked={withSubdomain}
      />
      <CreateSubdomainDialog
        records={subdomains}
        open={openCreateSubdomainModal}
        close={handleCloseCreateSubdomainModal}
        zone={selectedZone}
        reload={reloadRecords}
      />
    </Card>
  );
};

export default DomainInput;
