import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Add from '@material-ui/icons/Add';

// Utils
import { useLeagues } from '../../stores';

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

const Leagues: React.FC = () => {
  const classes = useStyles();
  const { leagues, loadUserLeagues } = useLeagues();

  return (
    <div>
      <Typography component="h4" variant="h4" className={classes.title}>
        Your leagues
        {/* Just a testing button to make sure the callouts work*/}
        <IconButton aria-label="View" onClick={() => loadUserLeagues()}>
          <Visibility />
        </IconButton>
      </Typography>

      <section>
        {
          leagues.map(league => (
            <LeagueCard league={league} key={league.id}>
              <IconButton aria-label="View">
                <Visibility />
              </IconButton>
              <IconButton aria-label="New match">
                <Add />
              </IconButton>
            </LeagueCard>
          ))
        }
      </section>
    </div>
  )
};

export default React.memo(Leagues);
