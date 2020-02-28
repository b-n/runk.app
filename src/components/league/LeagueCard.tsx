import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
    justifyContent: 'space-between',
    maxHeight: 140,
    alignItems: 'flex-start',
  },
  content: {
    flexShrink: 1,
    wordBreak: 'break-word',
  },
  cover: {
    width: 130,
    flexShrink: 0,
  },
});

interface LeagueCardProps {
  league: League;
  children?: ReactNode;
  onClick: () => void;
};

const LeagueCard = ({ children, league, onClick }: LeagueCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={onClick} className={classes.content}>
        <CardContent>
          <Typography component="h5" variant="h5">
            {league.displayName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" >
            {league.description}
          </Typography>
          {children}
        </CardContent>
      </CardActionArea>
      <CardMedia
        component="img"
        className={classes.cover}
        image={league.pictureURL}
        title={league.displayName}
      />
    </Card>
  );
};

export default React.memo(LeagueCard);
