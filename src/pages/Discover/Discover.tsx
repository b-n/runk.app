import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';

// Utils
import { useDiscover } from '../../stores';

// Components
import { LeagueCard } from '../../components/league';


const useStyles = makeStyles({
  title: {
    color: 'white',
    flex: 1,
    margin: 0,
    padding: '10px 20px',
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
