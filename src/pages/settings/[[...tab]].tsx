import { Settings } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import RequiresAuthentication from '../../components/RequiresAuthentication';
import RouterTabs, { TabsType } from '../../components/RouterTabs';
import SettingsCloudflareTab from '../../components/settings/SettingsCloudflareTab';
import SettingsGeneralTab from '../../components/settings/SettingsGeneralTab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudflare } from '@fortawesome/free-brands-svg-icons';

const tabs: TabsType = {
  general: {
    name: 'General',
    route: 'general',
    icon: <Settings />,
    child: <SettingsGeneralTab />,
  },
  cloudflare: {
    name: 'Cloudflare',
    route: 'cloudflare',
    icon: <FontAwesomeIcon icon={faCloudflare} />,
    child: <SettingsCloudflareTab />,
  },
};

const SettingsPage: NextPage = () => {
  return (
    <RequiresAuthentication>
      <Stack spacing={2}>
        <Typography variant="h4" component="h1">
          Settings
        </Typography>

        <RouterTabs
          tabs={tabs}
          baseRoute={'/settings'}
          defaultTab={'general'}
        />
      </Stack>
    </RequiresAuthentication>
  );
};

export default SettingsPage;
