import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Add from '@material-ui/icons/Add';

// Utils
import { useLeagues } from '../../stores';

// Components
import { Logo } from '../../components/Logo'
import { LeagueCard } from '../../components/league';


const useStyles = makeStyles({
  title: {
    flex: 1,
    margin: 0,
    padding: '10px 20px',
  },
  logo: {
    paddingRight: '10px',
  }
});

const Leagues: React.FC = () => {
  const classes = useStyles();
  const { leagues, loadUserLeagues } = useLeagues();

  return (
    <div>
      <Typography component="h4" variant="h4" className={classes.title} color={'primary'}>
        <Logo width={35} height={35} className={classes.logo}/>
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
