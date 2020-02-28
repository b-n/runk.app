import React from 'react';

import RunkeeList from './RunkeeList';
import Runkee from './Runkee';

import { League } from '../../../interfaces/League';

interface RunkingProps {
  league: League;
  onClick: (id: string) => void;
}

const Runking: React.FC<RunkingProps> = ({ league, onClick }) => {
  const users = Object.values(league.users!)
    .filter(player => player.isActive);

  users.sort((a, b) => b.score - a.score);

  return (
    <>
      {
        league.users &&
        <RunkeeList>
          {
            users.map(player => (
              <Runkee onClick={onClick} key={player.id} {...player} />
            ))
          }
        </RunkeeList>
      }
    </>
  );
};

export default Runking;
