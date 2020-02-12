import React, { useEffect } from 'react';
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
import { useUpdateLeagues } from '../../stores/leagues';


const useStyles = makeStyles({
  title: {
    flex: 1,
    margin: 0,
    padding: '10px 20px',
  },
  logo: {
    paddingRight: '10px',
  },
  loading: {
    display: 'block',
    margin: '50px auto',
  }
});

const Leagues: React.FC = () => {
  const classes = useStyles();
  const { leagues, isLoading } = useLeagues();
  const { loadUserLeagues } = useUpdateLeagues();

  useEffect(() => {
    loadUserLeagues()
  }, [])

  return (
    <div>
      <Typography component="h4" variant="h4" className={classes.title} color={'primary'}>
        <Logo width={26} height={26} className={classes.logo}/>
        Your leagues
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
        {
          isLoading && (
            <Logo width={120} height={120} className={classes.loading} animateTail/>
          )
        }
      </section>
    </div>
  )
};

export default React.memo(Leagues);
