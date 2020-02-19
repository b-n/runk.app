import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}));

const RunkeeList: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <List className={classes.root} disablePadding>
      {children}
    </List>
  );
}

export default RunkeeList
