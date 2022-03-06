import { Delete } from '@mui/icons-material';
import { Button, IconButton, Popover, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

type DeleteButtonProps = {
  message?: string;
  handleDelete: () => Promise<void>;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  message = 'Do you want to delete this?',
  handleDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = async () => {
    setLoading(true);

    await handleDelete();

    setLoading(false);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton disabled={open} onClick={handleClick} color="error">
        <Delete />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack sx={{ pt: 2, pl: 2, pr: 2, pb: 1 }}>
          <Typography>{message}</Typography>
          <Stack sx={{ mt: 1 }} justifyContent="flex-end" direction="row">
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loadingPosition="start"
              startIcon={<Delete />}
              loading={loading}
              onClick={onDelete}
              color="error"
            >
              Delete
            </LoadingButton>
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
};

export default DeleteButton;
