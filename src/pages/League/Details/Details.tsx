import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Share from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';

import { useUser } from '../../../stores/user';
import { useLeagueService } from '../../../services/leagues';
import { League } from '../../../interfaces/League';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    width: '80vw',
    maxWidth: 345,
  },
  media: {
    height: 345,
    maxHeight: '80vw',
    maxWidth: '80vw',
  },
  cta: {
    marginTop: '20px',
    width: '80vw',
    maxWidth: 345,
  },
});

interface DetailsProps {
  league: League;
  onAction: () => void;
}

const Details: React.FC<DetailsProps> = ({ league, onAction }) => {
  const { user } = useUser();
  const LeagueService = useLeagueService();
  const classes = useStyles();
  const [shareOpen, setShareOpen] = useState(false);
  const [ctaType, setCtaType] = useState('');

  useEffect(() => {
    if (!user || !league.id) {
      return;
    }
    const userLeague = user.leagues[league.id];
    setCtaType(userLeague ? 'Leave' : 'Join');
  }, [user, league.id]);

  const handleShare = () => {
    setShareOpen(!shareOpen);
  };

  const handleCTA = () => {
    const action = ctaType === 'Join'
      ? LeagueService.join
      : LeagueService.leave;

    action(league!.id!)
      .then(() => onAction());
  };

  return (
    <Box m={4} className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          image={league.pictureURL}
          className={classes.media}
        />
        <CardContent>
          <Typography variant="body2">
            {league.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<Share />}
            onClick={(() => handleShare())}
          >
            Share
          </Button>
        </CardActions>
      </Card>
      {
        league.id &&
        <Button
          className={classes.cta}
          variant="contained"
          color={ctaType === 'Join' ? 'primary' : 'secondary'}
          onClick={() => handleCTA()}
        >
          {ctaType}
        </Button>
      }
    </Box>
  );
};

export default React.memo(Details);
