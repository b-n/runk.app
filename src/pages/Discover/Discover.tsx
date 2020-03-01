import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

// Utils
import { League } from '../../interfaces/League';
import { useLeagueService } from '../../services/leagues';
import { useUser } from '../../stores/user';

// Components
import Title from '../../components/Title';
import { LeagueCard } from '../../components/league';

const Discover: React.FC = () => {
  const history = useHistory();
  const { user } = useUser();
  const { getDiscoverLeagues, join } = useLeagueService();
  const [leagues, setLeagues] = useState<Array<League>>([]);

  useEffect(() => {
    getDiscoverLeagues()
      .then(leagues => setLeagues(leagues));
  }, [getDiscoverLeagues]);

  return (
    <>
      <Title>Discover</Title>
      <section className="content">
        {
          leagues
            .filter(league => !user || (user && !user.leagues[league.id!]))
            .map(league => (
              <LeagueCard league={league} key={league.id} onClick={() => history.push(`/league/${league.id}`)}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Button variant="contained" color="primary" style={{ margin: 8 }} onClick={() => join(league.id!).then(() => getDiscoverLeagues().then(leagues => setLeagues(leagues)))}>Join</Button>
                  <Typography component="h6" variant="subtitle2">
                    {league.userCount} Player{league.userCount! > 1 ? 's' : ''}
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
