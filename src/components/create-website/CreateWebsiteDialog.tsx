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
import { ReloadWebsitesContext } from '../../pages/websites';
import { useSnackbar } from '../SnackbarProvider';

type CreateWebsiteModalProps = {
  open: boolean;
  close: () => void;
};

const defaultValues: CreateWordPressInput = {
  name: '',
  url: '',
  dbUsername: 'admin',
  dbPassword: '',
};

const CreateWebsiteModal: React.FC<CreateWebsiteModalProps> = ({
  open,
  close,
}) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const reloadWebsites = useContext(ReloadWebsitesContext);
  const snackbar = useSnackbar();

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
        <DialogTitle>Create Website</DialogTitle>
        <DialogContent sx={{ mt: 2, pt: 1 }}>
          <Stack style={{ marginTop: 6 }} spacing={2}>
            <TextField
              name="name"
              label="Name"
              placeholder="My Blog"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="url"
              label="URL"
              placeholder="antonwy.me"
              value={formValues.url}
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
