import styled from '@emotion/styled';
import { Avatar, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';

const Username = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
`;

const AccountType = styled(Typography)`
  font-size: 12px;
`;

const UserContainer = () => {
  return (
    <Paper
      sx={{
        padding: 2,
        bgcolor: 'customBackground.main',
        borderRadius: 2,
      }}
      elevation={0}
    >
      <Stack spacing={2} alignItems="center" direction="row">
        <Avatar />
        <Stack>
          <Username variant="body1" color="text.primary">
            Antonwy
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
