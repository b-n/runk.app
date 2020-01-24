import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

// Utils
import { useUser } from '../../stores';

// Components


const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    flex: 1,
    margin: 0,
    padding: '10px 20px',
  },
  large: {
    width: 200,
    height: 200,
    margin: 30,
  },
});

const Profile: React.FC = () => {
  const classes = useStyles();
  const { user } = useUser();

  return (
    <div className={classes.container}>
      <Avatar alt={user.name} src={user.img} className={classes.large} />
    </div>
  )
};

export default React.memo(Profile);
