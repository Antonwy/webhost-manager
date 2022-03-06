import * as React from 'react';
import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import RequiresAuthentication from '../../components/RequiresAuthentication';
import Layout from '../../components/Layout';
import { Stack, Tab } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Key, Portrait } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChangePasswordTab from '../../components/account/ChangePasswordTab';
import RouterTabs, { TabsType } from '../../components/RouterTabs';
import AccountGeneralTab from '../../components/account/AccountGeneralTab';

const tabs: TabsType = {
  general: {
    name: 'General',
    route: 'general',
    icon: <Portrait />,
    child: <AccountGeneralTab />,
  },
  changePassword: {
    name: 'Change Password',
    route: 'changePassword',
    icon: <Key />,
    child: <ChangePasswordTab />,
  },
};

const Account: NextPage = () => {
  return (
    <RequiresAuthentication>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          Account
        </Typography>
        {/* <Breadcrumbs
            sx={{
              fontSize: 14,
            }}
            color="text.primary"
            separator="•"
          >
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
            <Link underline="hover" color="inherit" href="/account">
              User
            </Link>
            <Typography fontSize="inherit" color="gray">
              Account Settings
            </Typography>
          </Breadcrumbs> */}
        <RouterTabs tabs={tabs} defaultTab="general" baseRoute="/account" />
      </Stack>
    </RequiresAuthentication>
  );
};

export default Account;
