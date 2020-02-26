import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    flex: 1,
    margin: 0,
    padding: '10px 20px',
  },
});

interface TitleProps {
  
}

const Title: React.FC<TitleProps> = ({ children }) => {
  const classes = useStyles()
  return (
    <Typography
      component="h4"
      variant="h4"
      className={classes.title}
      color={'primary'}
    >
      {children}
    </Typography>
  )
}

export default React.memo(Title)
