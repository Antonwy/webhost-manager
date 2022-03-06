import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { API } from '../../api/API';
import { CreateDNSRecordInput } from '../../api/requests/cloudflare/createDNSRecord';
import { ApiError } from '../../api/responses/apiError';
import { DNSRecord } from '../../models/dns_record';
import { ReloadRecordsContext } from '../../pages/dns';
import { useSnackbar } from '../SnackbarProvider';
import { uniq } from 'lodash';
import DNSZone from '../../models/dns_zone';

type CreateSubdomainModalProps = {
  open: boolean;
  close: () => void;
  zone?: DNSZone;
  records: DNSRecord[];
  reload: () => Promise<any>;
};

const CreateSubdomainDialog: React.FC<CreateSubdomainModalProps> = ({
  open,
  close,
  zone,
  records,
  reload,
}) => {
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const availableIps = uniq(records.map((r) => r.content));

  const defaultValues = {
    subdomain: '',
    ip: availableIps[0] ?? '',
    proxied: true,
  };

  useEffect(() => {
    if (!formValues.ip && availableIps) {
      setFormValues({
        ...formValues,
        ip: availableIps[0],
      });
    }
  }, [records]);

  const [formValues, setFormValues] = useState(defaultValues);
  console.log(formValues.ip);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleProxied = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.checked,
    });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('SUBMIT : ');
    console.log(formValues);
    if (!zone) return snackbar.error('Please select a zone!');

    setLoading(true);

    try {
      const res = await API.createDNSRecord(zone.id, {
        name: `${formValues.subdomain}.${zone.name}`,
        type: 'A',
        content: formValues.ip,
        proxied: true,
        ttl: 1,
      });

      reload();
      handleClose();
      snackbar.success(res.message);
    } catch (err) {
      if (err instanceof ApiError) {
        snackbar.error(err.message);
      } else {
        snackbar.error('Internal Error');
      }
    }

    setLoading(false);
  };

  const handleClose = () => {
    close();
    setFormValues(defaultValues);
  };

  return (
    <Dialog open={open} onClose={close}>
      <form onSubmit={onSubmit}>
        <DialogTitle>Create Subdomain</DialogTitle>
        <DialogContent sx={{ mt: 2, pt: 1 }}>
          <Stack style={{ marginTop: 6 }} spacing={2}>
            <Stack direction="row" spacing={1} alignItems="baseline">
              <TextField
                name="subdomain"
                label="Subdomain"
                placeholder="test"
                value={formValues.subdomain}
                onChange={handleInputChange}
                sx={{ width: 120 }}
                required
              />
              <Typography>.{zone?.name ?? 'Please provide a zone!'}</Typography>
            </Stack>
            <FormControl required sx={{ flexGrow: 2 }}>
              <InputLabel>Proxy IP</InputLabel>
              <Select
                value={formValues.ip}
                name="ip"
                sx={{ minWidth: 100 }}
                label="Proxy IP"
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {availableIps.map((ip) => (
                  <MenuItem key={ip} value={ip}>
                    {ip}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="proxied"
                  checked={formValues.proxied}
                  onChange={handleProxied}
                />
              }
              label="Proxied?"
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <LoadingButton
            loadingPosition="start"
            startIcon={<Add />}
            loading={loading}
            type="submit"
            variant="contained"
          >
            Create
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateSubdomainDialog;
