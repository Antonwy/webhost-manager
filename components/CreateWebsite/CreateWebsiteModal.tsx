import {
  Button,
  Card,
  Modal,
  Stack,
  Typography,
  Box,
  TextField,
} from '@mui/material';

type CreateWebsiteModalProps = {
  open: boolean;
  close: () => void;
};

const CreateWebsiteModal: React.FC<CreateWebsiteModalProps> = ({
  open,
  close,
}) => {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          p: 4,
          outline: 0,
        }}
      >
        <Typography variant="h6" component="h2">
          Create Website
        </Typography>

        <Box component="form" sx={{ mt: 2 }} noValidate autoComplete="off">
          <Stack spacing={2}>
            <TextField label="Name" placeholder="My Blog" required />
            <Typography>User Info:</Typography>
            <Stack direction="row" spacing={2}>
              <TextField label="Username" defaultValue="admin" />
              <TextField
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Stack>
            <Typography>Database Info:</Typography>
            <Stack direction="row" spacing={2}>
              <TextField label="Username" defaultValue="admin" />
              <TextField
                label="Password"
                placeholder="Password"
                type="password"
              />
            </Stack>
          </Stack>
        </Box>

        <Stack
          sx={{ mt: 4 }}
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button onClick={close} color="error">
            Cancel
          </Button>
          <Button variant="contained">Create</Button>
        </Stack>
      </Card>
    </Modal>
  );
};

export default CreateWebsiteModal;
