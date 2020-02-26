import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

// Utils
import { League } from '../../interfaces/League';

// Components


const useStyles = makeStyles({
  card: {
    display: 'flex',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
  },
});

interface LeagueCardProps {
  league: League;
  children?: ReactNode;
};

const LeagueCard = (props: LeagueCardProps) => {
  const classes = useStyles();
  const { league } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {league.displayName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" >
            {league.description}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {props.children}
        </div>
      </div>
      <CardMedia
        component="img"
        className={classes.cover}
        image={league.pictureURL}
        title={league.displayName}
      />
    </Card>
  )
};

export default React.memo(LeagueCard);
