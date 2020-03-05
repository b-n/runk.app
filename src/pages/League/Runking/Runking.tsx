import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTranslation } from 'react-i18next';

import RunkeeList from './RunkeeList';
import Runkee from './Runkee';

import { League } from '../../../interfaces/League';

interface RunkingProps {
  league: League;
  onClick: (id: string) => void;
}

const Runking: React.FC<RunkingProps> = ({ league, onClick }) => {
  const { t } = useTranslation();
  const users = Object.values(league.users!)
    .filter(player => player.isActive);

  users.sort((a, b) => b.score - a.score);

  const active = users.filter(user => user.score !== 1000);
  const inactive = users.filter(user => user.score === 1000);

  return (
    <>
      {
        league.users &&
        <RunkeeList>
          {
            active.length > 0 &&
            <>
              <ListSubheader>{t('match:Active players')}</ListSubheader>
              {
                active.map(player => (
                  <Runkee onClick={onClick} key={player.id} {...player} />
                ))
              }
            </>
          }
          {
            inactive.length > 0 &&
            <>
              <ListSubheader>{t('match:Inactive players')}</ListSubheader>
              {
                inactive.map(player => (
                  <Runkee onClick={onClick} key={player.id} {...player} />
                ))
              }
            </>
          }
        </RunkeeList>
      }
    </>
  );
};

export default Runking;
