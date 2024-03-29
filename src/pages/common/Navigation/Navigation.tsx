import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useLocation, useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

// Utils

// Components

const useStyles = makeStyles({
  bottomNavigation: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
});

const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState<string>('leagues');

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setCurrentTab(path || 'leagues');
  }, [location.pathname]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setCurrentTab(newValue);
    history.push(`/${newValue}`);
  };

  return (
    <BottomNavigation value={currentTab} onChange={handleChange} className={classes.bottomNavigation}>
      <BottomNavigationAction label={t('common:Leagues')} value="leagues" icon={<SupervisedUserCircle />} />
      <BottomNavigationAction label={t('common:Discover')} value="discover" icon={<Search />} />
      <BottomNavigationAction label={t('common:Profile')} value="profile" icon={<AccountCircle />} />
    </BottomNavigation>
  );
};

export { Navigation };
