import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Share from '@material-ui/icons/Share'
import Typography from '@material-ui/core/Typography';

import { useLeagues, useLeaguesMutations } from '../../../stores'
import { useLeagueService } from '../../../services/leagues'
import { League } from '../../../interfaces/League'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  card: {
    maxWidth: 345,
    width: '100vw',
  },
  media: {
    height: '100vh',
    maxHeight: '80vw',
  },
  cta: {
    marginTop: '20px',
    width: '100vw',
    maxWidth: 345,
  }
});


interface DetailsProps {
  league: League
}

const Details: React.FC<DetailsProps>  = ({ league }) => {
  const { leagues, isLoading } = useLeagues()
  const { loadUserLeagues } = useLeaguesMutations()
  const LeagueService = useLeagueService()
  const classes = useStyles()
  const [ shareOpen, setShareOpen ] = useState(false)
  const [ ctaType, setCtaType ] = useState('')

  useEffect(() => {
    loadUserLeagues()
  }, [ loadUserLeagues ])

  useEffect(() => {
    if (!isLoading) {
      const userLeague = leagues.filter(ul => ul.id === league.id)
      setCtaType(userLeague.length > 0 ? 'Leave' : 'Join')
    }
  }, [ leagues, league.id, isLoading ])

  const handleShare = () => {
    setShareOpen(!shareOpen)
  }

  const handleJoin = () => {
    LeagueService.join(league!.id!)
      .then(() => loadUserLeagues())
  }

  const handleLeave = () => {
    LeagueService.leave(league!.id!)
      .then(() => loadUserLeagues())
  }

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
        league.id && ctaType === 'Join' &&
        <Button
          className={classes.cta}
          variant="contained"
          color="primary"
          onClick={() => handleJoin()}
        >
          Join
        </Button>
      }
      {
        league.id && ctaType === 'Leave' &&
        <Button
          className={classes.cta}
          variant="contained"
          color="secondary"
          onClick={() => handleLeave()}
        >
          Leave
        </Button>
      }
    </Box>
  )
}

export default React.memo(Details)
