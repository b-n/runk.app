import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Add from '@material-ui/icons/Add';

// Utils
import { useDiscover } from '../../stores';

// Components
import LeagueCard from '../Leagues/LeagueCard';


const useStyles = makeStyles({
  title: {
    flex: 1,
    padding: '10px 20px',
    margin: 0,
    color: 'white',
  },
});

const Discover: React.FC = () => {
  const classes = useStyles();
  const { leagues } = useDiscover();

  return (
    <div>
      <Typography component="h4" variant="h4" className={classes.title}>
        Discover
      </Typography>
      <section>
        {
          leagues.map(league => (
            <LeagueCard league={league} key={league.id}>
              <IconButton aria-label="View">
                <Visibility />
              </IconButton>
              <Typography component="h6" variant="subtitle2">
                {league.players_amount} Players
              </Typography>
            </LeagueCard>
          ))
        }
      </section>
    </div>
  )
};

export default React.memo(Discover);
