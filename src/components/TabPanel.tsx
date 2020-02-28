import React from 'react';

interface TabPanelProps {
  children: React.ReactNode;
  currentTab: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ currentTab, index, children }) => (
  <>
    {currentTab === index && children}
  </>
);

export default React.memo(TabPanel);
