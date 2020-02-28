import { Match } from '../interfaces/Match';
import { getByLeagueId, postMatch } from '../api/match';

import { AuthenticationHeader } from '../interfaces/Auth';

const getMatchesByLeague = async (authenticationHeader: AuthenticationHeader, id: string): Promise<Array<Match>> => {
  return getByLeagueId(id, authenticationHeader)
    .then(result => result.json())
    .then(result => result.map((match: any) => ({ ...match, date: new Date(match.date) })));
};

const createMatch = async (authenticationHeader: AuthenticationHeader, leagueId: string, match: Match): Promise<Match> => {
  return postMatch(leagueId, match, authenticationHeader)
    .then(result => result.json());
};

export const useMatchService = () => {
  return {
    getMatchesByLeague,
    createMatch,
  };
};
