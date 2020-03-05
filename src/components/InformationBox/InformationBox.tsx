import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    flexShrink: 0,
  },
  title: {},
  icon: {
    paddingRight: '0.4rem',
  },
});

interface InformationBoxProps {
  title?: string;
  actions?: JSX.Element;
}

const InformationBox: React.FC<InformationBoxProps> = ({ title = 'Info', actions, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <InfoIcon fontSize="small" className={classes.icon} />
          {title}
        </Typography>
        {children}
      </CardContent>
      {
        actions &&
        <CardActions>
          {actions}
        </CardActions>
      }
    </Card>
  );
};

export default InformationBox;
