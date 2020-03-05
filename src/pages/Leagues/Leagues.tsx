import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

// Utils
import { useLeagues, useLeaguesMutations } from '../../stores';

// Components
import Title from '../../components/Title';
import { Logo } from '../common/Logo';
import { LeagueCard } from '../../components/league';
import { InformationBox } from '../../components/InformationBox';

const useStyles = makeStyles({
  cards: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0px 10px',
  },
  logo: {
    paddingRight: '10px',
  },
  loading: {
    display: 'block',
    margin: '50px auto',
  },
  newButton: {
    position: 'absolute',
    bottom: '80px',
    right: '20px',
  },
});

const Leagues: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { leagues, isLoading } = useLeagues();
  const { loadUserLeagues } = useLeaguesMutations();
  const history = useHistory();

  useEffect(() => {
    loadUserLeagues();
  }, [loadUserLeagues]);

  return (
    <>
      <Title>
        <Logo width={26} height={26} className={classes.logo}/>
        {t('league:Your Leagues')}
      </Title>
      <section className={`${classes.cards} content`}>
        {
          !isLoading &&
          leagues.length === 0 &&
          <InformationBox
            title={t('league:No Leagues')}
            actions={(
              <>
                <Button onClick={() => history.push('/discover')}>
                  {t('common:Discover')}
                </Button>
                <Button onClick={() => history.push('/leagues/create')}>
                  {t('common:Create')}
                </Button>
              </>
            )}>
            <Typography variant="body2">
              <Trans i18nKey="league:noLeaguesMessage">
                You don&apos;t belong any leagues.<br />
                Try to discover new leagues, or create your own
              </Trans>
            </Typography>
          </InformationBox>
        }
        {
          leagues.map(league => (
            <LeagueCard
              league={league}
              key={league.id}
              onClick={() => history.push(`/league/${league.id}`)}
            />
          ))
        }
        {
          isLoading && (
            <Logo width={120} height={120} className={classes.loading} animateTail/>
          )
        }
      </section>
      <Fab
        color="primary"
        className={classes.newButton}
        onClick={() => history.push('/leagues/create')}
      >
        <Add />
      </Fab>
    </>
  );
};

export default React.memo(Leagues);
