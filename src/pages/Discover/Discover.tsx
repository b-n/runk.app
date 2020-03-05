import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Utils
import { League } from '../../interfaces/League';
import { useLeagueService } from '../../services/leagues';
import { useUser, useUserMutations } from '../../stores/user';

// Components
import Title from '../../components/Title';
import { LeagueCard } from '../../components/league';

const useStyles = makeStyles({
  cards: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 10px',
  },
});

const Discover: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { user } = useUser();
  const { loadUser } = useUserMutations();
  const { getDiscoverLeagues, join } = useLeagueService();
  const [leagues, setLeagues] = useState<Array<League>>([]);

  useEffect(() => {
    getDiscoverLeagues()
      .then(leagues => setLeagues(leagues));
  }, [getDiscoverLeagues]);

  const handleJoinClick = (id: string) => {
    join(id)
      .then(() => Promise.all([
        getDiscoverLeagues()
          .then(leagues => setLeagues(leagues)),
        loadUser(),
      ]));
  };

  return (
    <>
      <Title>{t('common:Discover')}</Title>
      <section className={`${classes.cards} content`}>
        {
          leagues
            .filter(league => !user || (user && !user.leagues[league.id!]))
            .map(league => (
              <LeagueCard league={league} key={league.id} onClick={() => history.push(`/league/${league.id}`)}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Button variant="contained" color="primary" style={{ margin: 8 }} onClick={() => handleJoinClick(league.id!)}>
                    {t('common:Join')}
                  </Button>
                  <Typography component="h6" variant="subtitle2">
                    {league.userCount} {t('common:Player', { count: league.userCount! })}
                  </Typography>
                </div>
              </LeagueCard>
            ))
        }
      </section>
    </>
  );
};

export default React.memo(Discover);
