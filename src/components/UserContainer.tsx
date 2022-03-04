import styled from '@emotion/styled';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { API } from '../api/API';

const Username = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
`;

const AccountType = styled(Typography)`
  font-size: 12px;
`;

const UserContainer = () => {
  const { user } = API.useUser();

  return (
    <Paper
      sx={{
        padding: 2,
        bgcolor: 'background.neutral',
        borderRadius: 2,
      }}
      elevation={0}
    >
      <Stack spacing={2} alignItems="center" direction="row">
        <Avatar />
        <Stack>
          <Username variant="body1" color="text.primary">
            {user.name ?? 'Loading'}
          </Username>
          <AccountType variant="body2" color="text.secondary">
            Admin
          </AccountType>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UserContainer;
