import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

// Utils
import { League } from '../../interfaces/League';

// Components

const useStyles = makeStyles({
  card: {
    flexShrink: 0,
    maxWidth: 350,
    width: '100%',
    margin: 10,
  },
  image: {
    height: 200,
    flexShrink: 0,
  },
  content: {
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    flex: 1,
    padding: 0,
    width: '100%',
  },
  text: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    flexShrink: 0,
    maxWidth: 350,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
});

interface LeagueCardProps {
  league: League;
  children?: React.ReactNode;
  onClick: () => void;
};

const LeagueCard: React.FC<LeagueCardProps> = ({ children, league, onClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          className={classes.image}
          image={league.pictureURL}
          title={league.displayName}
        />
        <CardContent className={classes.content}>
          <div style={{ margin: 8 }}>
            <Typography gutterBottom variant="h6" component="h2" className={classes.text}>
              {league.displayName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.text}>
              {league.description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      {children && (
        <CardActions>
          {children}
        </CardActions>
      )}
    </Card>
  );
};

export default React.memo(LeagueCard);
