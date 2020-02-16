import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, TextField } from '@material-ui/core';

// Utils
import { useUser, useUserMutations } from '../../stores';

// Components
import { SVGId } from '../common/SVGId'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    margin: 0,
    padding: '10px 20px',
  },
  large: {
    width: 200,
    height: 200,
    margin: 30,
  },
  icon: {
    paddingRight: '10px',
  }
});

const Profile: React.FC = () => {
  const classes = useStyles();
  const { loadUser } = useUserMutations();
  const { user } = useUser();

  useEffect(() => {
    loadUser();
  }, [])

  return (
    <div>
      <Typography component="h4" variant="h4" className={classes.title} color={'primary'}>
        {user && <SVGId id={user.id} width={26} height={26} className={classes.icon}/>}
        Profile
      </Typography>
      {user && <div className={classes.container}>
        <Avatar alt={user.name} src={user.img} className={classes.large} variant="circle" />
        <TextField
          error={false}
          label="Display name"
          defaultValue={user.name}
        />
      </div>}
    </div>
  )
};

export default React.memo(Profile);
