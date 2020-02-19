import React from 'react';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';

// Utils
import { useDiscover } from '../../stores';

// Components
import Title from '../../components/Title'
import { LeagueCard } from '../../components/league';

const Discover: React.FC = () => {
  const { leagues } = useDiscover();

  return (
    <div>
      <Title>Discover</Title>
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
