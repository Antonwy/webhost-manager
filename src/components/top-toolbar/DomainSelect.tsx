import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { API } from '../../api/API';

const DomainSelect: React.FC = () => {
  const { zones } = API.useZones();
  const [domain, setDomain] = React.useState('antonwy.me');

  const handleChange = (event: SelectChangeEvent) => {
    setDomain(event.target.value as string);
  };

  return (
    <FormControl sx={{ width: 200 }} size="small">
      <InputLabel>Domain</InputLabel>
      <Select value={domain} label="Domain" onChange={handleChange}>
        {zones.map((z) => (
          <MenuItem key={z.id} value={z.id}>
            {z.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DomainSelect;
