import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

// Utils
// import { useAuth } from '../../stores';

// Components
import { Leagues } from '../Leagues';
import { Discover } from '../Discover';
import { Profile } from '../Profile';

const useStyles = makeStyles({
  bottomNavigation: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
});

const Home: React.FC = () => {
  // const { auth } = useAuth();
  const classes = useStyles();
  const [value, setValue] = React.useState('leagues');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      {
        showComponent(value)
      }
      <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNavigation}>
        <BottomNavigationAction label="Leagues" value="leagues" icon={<SupervisedUserCircle />} />
        <BottomNavigationAction label="Discover" value="discover" icon={<Search />} />
        <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircle />} />
      </BottomNavigation>
      {/* { auth.isAuthed && 'Authed' } */}
    </div>
  )
};

const showComponent = (value: string) => {
  switch(value) {
    case 'discover':
      return <Discover />;
    case 'profile':
      return <Profile />;
    default:
      return <Leagues />;
  }
};

export default React.memo(Home);
