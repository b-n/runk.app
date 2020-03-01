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
    maxHeight: 130,
    alignItems: 'flex-start',
  },
  wrapper: {
    flexShrink: 1,
    wordBreak: 'break-word',
    minWidth: 0,
  },
  content: {
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '98px',
  },
  cover: {
    width: 130,
    flexShrink: 0,
  },
  title: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    flexShrink: 0,
  },
  description: {
    overflow: 'hidden',
    flexShrink: 1,
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
      <CardActionArea onClick={onClick} className={classes.wrapper}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} component="h5" variant="h5">
            {league.displayName}
          </Typography>
          <Typography className={classes.description} variant="subtitle1" color="textSecondary" >
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
