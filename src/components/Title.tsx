import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    flex: 1,
    margin: 0,
    padding: '10px 20px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
});

const Title = ({ children, variant }: { children: React.ReactNode; variant?: 'title' | 'subtitle' }) => {
  const classes = useStyles();
  return (
    <Typography
      component={ variant && variant === 'subtitle' ? 'h6' : 'h4' }
      variant={ variant && variant === 'subtitle' ? 'h6' : 'h4' }
      className={classes.title}
      color={'primary'}
    >
      {children}
    </Typography>
  );
};

export default React.memo(Title);
