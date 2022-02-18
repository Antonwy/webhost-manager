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
  DialogContentText,
} from '@mui/material';
import { useContext, useState } from 'react';
import { API } from '../../api/API';
import { CreateWordPressInput } from '../../api/requests/wordpress/createWordpress';
import { ApiError } from '../../api/responses/apiError';
import {
  ReloadWebsitesContext,
  WebsitesSnackBarContext,
} from '../../pages/websites';

type CreateWebsiteModalProps = {
  open: boolean;
  close: () => void;
};

const defaultValues: CreateWordPressInput = {
  name: '',
  dbUsername: 'admin',
  dbPassword: '',
  port: '40000',
};

const CreateWebsiteModal: React.FC<CreateWebsiteModalProps> = ({
  open,
  close,
}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const reloadWebsites = useContext(ReloadWebsitesContext);
  const showSnackBar = useContext(WebsitesSnackBarContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await API.createWordPressSite(formValues);
      reloadWebsites();
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
        <DialogTitle>Create Website</DialogTitle>
        <DialogContent sx={{ mt: 2, pt: 1 }}>
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              placeholder="My Blog"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
            <DialogContentText variant="body1" component="p">
              Database Info:
            </DialogContentText>
            <Stack direction="row" spacing={2}>
              <TextField
                name="dbUsername"
                label="Username"
                onChange={handleInputChange}
                value={formValues.dbUsername}
                required
              />
              <TextField
                name="dbPassword"
                label="Password"
                placeholder="Password"
                type="password"
                value={formValues.dbPassword}
                onChange={handleInputChange}
                required
              />
            </Stack>

            <DialogContentText variant="body1" component="p">
              Network Info:
            </DialogContentText>
            <TextField
              name="port"
              label="Port"
              type="number"
              value={formValues.port}
              onChange={handleInputChange}
              required
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

export default CreateWebsiteModal;
