import * as React from 'react';
import { Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useRouter } from 'next/router';

type TabsProps = {
  tabs: TabsType;
  baseRoute: string;
  defaultTab: string;
};

export type TabsType = {
  [key: string]: TabType;
};

type TabType = {
  name: string;
  route: string;
  icon: React.ReactElement;
  child: React.ReactElement;
};

const RouterTabs: React.FC<TabsProps> = ({ tabs, baseRoute, defaultTab }) => {
  const router = useRouter();
  const { tab } = router.query;
  const [currentTab, setCurrentTab] = useState<TabType>(tabs['general']);

  const updateCurrentTab = () => {
    if (!tab) {
      return setCurrentTab(tabs[defaultTab]);
    }

    setCurrentTab(tabs[tab[0]]);
  };

  useEffect(updateCurrentTab, [tab]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    router.push(`${baseRoute}/${newValue}`, undefined, {
      shallow: true,
    });
  };

  return (
    <TabContext value={currentTab.route}>
      <TabList onChange={handleTabChange}>
        {Object.entries(tabs).map(([route, tab], i) => (
          <Tab
            icon={tab.icon}
            iconPosition="start"
            key={i}
            value={route}
            label={tab.name}
          />
        ))}
      </TabList>
      {Object.entries(tabs).map(([route, tab], i) => (
        <TabPanel key={i} value={route}>
          {tab.child}
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default RouterTabs;
