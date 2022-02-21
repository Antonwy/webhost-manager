import { Add, ZoomInOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Checkbox,
  FormControlLabel,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { minWidth } from '@mui/system';
import { useContext, useState } from 'react';
import { API } from '../../api/API';
import { CreateDNSRecordInput } from '../../api/requests/cloudflare/createDNSRecord';
import { CreateWordPressInput } from '../../api/requests/wordpress/createWordpress';
import { ApiError } from '../../api/responses/apiError';
import { DNSZone } from '../../models/dns_zone';
import { RecordsSnackBarContext, ReloadRecordsContext } from '../../pages/dns';
import {
  ReloadWebsitesContext,
  WebsitesSnackBarContext,
} from '../../pages/websites';

type CreateDNSRecordModalProps = {
  open: boolean;
  close: () => void;
  zone: DNSZone;
};

const DNSRecordTypes = [
  'A',
  'AAAA',
  'ALIAS',
  'CNAME',
  'MX',
  'NS',
  'PTR',
  'SOA',
  'SRV',
  'TXT',
];

const defaultValues: CreateDNSRecordInput = {
  name: '',
  type: 'A',
  content: '',
  proxied: true,
  ttl: 1,
};

const CreateDNSRecordModal: React.FC<CreateDNSRecordModalProps> = ({
  open,
  close,
  zone,
}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const reloadRecords = useContext(ReloadRecordsContext);
  const showSnackBar = useContext(RecordsSnackBarContext);

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
    setLoading(true);

    try {
      const res = await API.createDNSRecord(zone.id, formValues);
      reloadRecords();
      handleClose();
      showSnackBar({ message: res.message, severity: 'success' });
    } catch (err) {
      if (err instanceof ApiError) {
        showSnackBar({ message: err.message, severity: 'error' });
      } else {
        showSnackBar({ message: 'Internal Error', severity: 'error' });
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
        <DialogTitle>Create DNS Record</DialogTitle>
        <DialogContent sx={{ mt: 2, pt: 1 }}>
          <Stack style={{ marginTop: 6 }} spacing={2}>
            <Stack direction="row" spacing={2}>
              <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formValues.type}
                  name="type"
                  sx={{ minWidth: 100 }}
                  label="Type"
                  onChange={handleSelectChange}
                >
                  {DNSRecordTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="name"
                label="Name"
                placeholder={zone.name}
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </Stack>
            <TextField
              name="content"
              label="Content"
              placeholder="182.168.2.1"
              value={formValues.content}
              onChange={handleInputChange}
              required
            />
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

export default CreateDNSRecordModal;
