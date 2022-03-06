import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useEffect } from 'react';
import { API } from '../../api/API';

export const defaultSelectedZoneIdKey = 'default_selected_zone_id';

const ZoneSelect: React.FC = () => {
  const { zones, loading } = API.useZones();
  const [domain, setDomain] = React.useState<string>('');

  useEffect(() => {
    const zoneId = localStorage.getItem(defaultSelectedZoneIdKey);

    if (zoneId) setDomain(zoneId);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setDomain(event.target.value);
    localStorage.setItem(defaultSelectedZoneIdKey, event.target.value);
  };

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 100 }}>
      <InputLabel>{loading ? 'Loading...' : 'Select Domain'}</InputLabel>
      <Select
        value={loading ? '' : domain}
        label="Select Domain"
        onChange={handleChange}
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
  );
};

export default ZoneSelect;
