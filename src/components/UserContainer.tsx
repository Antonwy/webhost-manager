import styled from '@emotion/styled';
import { Avatar, Badge, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { API } from '../api/API';
import Link from './Link';

const Username = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
`;

const AccountType = styled(Typography)`
  font-size: 12px;
`;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const UserContainer = () => {
  const { user } = API.useUser();

  return (
    <Link href="/account" underline="none">
      <Paper
        sx={{
          padding: 2,
          bgcolor: 'background.neutral',
          borderRadius: 2,
        }}
        elevation={0}
      >
        <Stack spacing={2} alignItems="center" direction="row">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar></Avatar>
          </StyledBadge>
          <Stack>
            <Username variant="body1" color="text.primary">
              {user.name ?? 'Loading'}
            </Username>
            <AccountType variant="body2" color="text.secondary">
              {user.role ?? 'Loading'}
            </AccountType>
          </Stack>
        </Stack>
      </Paper>
    </Link>
  );
};

export default UserContainer;
