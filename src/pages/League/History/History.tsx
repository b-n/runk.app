import React, { useEffect, useState } from 'react';

import { useMatchService } from '../../../services/match';
import { League } from '../../../interfaces/League';
import { Match } from '../../../interfaces/Match';

import { useAuth } from '../../../stores';

interface HistoryProps {
  league: League;
}

const History: React.FC<HistoryProps> = ({ league }) => {
  const { authenticationHeader } = useAuth();
  const { getMatchesByLeague } = useMatchService();
  const [matches, setMatches] = useState<Array<Match>>([]);

  useEffect(() => {
    if (!league.id) {
      return;
    }
    getMatchesByLeague(authenticationHeader!, league.id)
      .then(matches => setMatches(matches));
  }, [league.id, getMatchesByLeague, authenticationHeader]);

  return (
    <div>
      History: {league.displayName}<br />
      Total Matches: {matches.length}<br />
    </div>
  );
};

export default React.memo(History);
