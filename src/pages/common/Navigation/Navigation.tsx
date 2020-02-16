import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router';

// Utils

// Components

const useStyles = makeStyles({
  bottomNavigation: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
});

const Navigation = ({ history }: { history: any }): JSX.Element => {
  const classes = useStyles();
  const [ value, setValue ] = React.useState<string>('leagues');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
    history.push(newValue);
  };

  return (
    <div>
      <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNavigation}>
        <BottomNavigationAction label="Leagues" value="leagues" icon={<SupervisedUserCircle />} />
        <BottomNavigationAction label="Discover" value="discover" icon={<Search />} />
        <BottomNavigationAction label="Profile" value="profile" icon={<AccountCircle />} />
      </BottomNavigation>
    </div>
  )
};

export default withRouter(Navigation);
