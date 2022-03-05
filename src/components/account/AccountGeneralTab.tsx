import { CameraAlt, Done, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { API } from '../../api/API';
import { ApiError } from '../../api/responses/apiError';
import User from '../../models/user';
import { useSnackbar } from '../SnackbarProvider';

const AccountGeneralTab = () => {
  const { user, reload } = API.useUser();
  const [edit, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const toggleEdit = (_: any) => {
    setName(user.name);
    setEditing(!edit);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const updateUserClick = async () => {
    try {
      setLoading(true);
      await API.updateUser({
        id: user.id,
        name: name,
      } as User);

      await reload();
      snackbar.success('Successfully updated user!');
      setEditing(false);
    } catch (error) {
      if (error instanceof ApiError) snackbar.error(error.message);
    }

    setLoading(false);
  };

  const config = {
    Role: user.role,
    Email: user.email,
    ID: user.id,
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <Stack direction="column" spacing={2} sx={{ p: 4 }}>
        <Stack sx={{ mb: 1 }} direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: 80, height: 80 }} />
          <Button startIcon={<CameraAlt />}>Add Image</Button>
        </Stack>
        <Stack alignItems="inherit">
          {edit ? (
            <TextField
              label="Name"
              sx={{ mb: 2 }}
              value={name}
              placeholder="Name"
              onChange={handleNameChange}
            />
          ) : (
            <Typography sx={{ mb: 1 }} variant="h4" component="h2">
              {user.name}
            </Typography>
          )}
          {Object.entries(config).map(([label, name]) => {
            return (
              <Stack key={label}>
                <Stack
                  sx={{ p: 1 }}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography fontWeight="bold" variant="body2" color="gray">
                    {label}:
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {name}
                  </Typography>
                </Stack>
                <Divider />
              </Stack>
            );
          })}
        </Stack>
        {edit ? (
          <Stack spacing={1} direction="row">
            <LoadingButton
              onClick={updateUserClick}
              loading={loading}
              startIcon={<Done />}
              variant="contained"
            >
              Save
            </LoadingButton>
            <Button onClick={toggleEdit} color="error">
              Cancel
            </Button>
          </Stack>
        ) : (
          <div>
            <Button
              onClick={toggleEdit}
              startIcon={<Edit />}
              variant="contained"
              color="warning"
            >
              Edit Account
            </Button>
          </div>
        )}
      </Stack>
    </Card>
  );
};

export default AccountGeneralTab;
