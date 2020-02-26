import { AuthenticationHeader } from '../interfaces/Auth';
import { Match } from '../interfaces/Match';

export const getByLeagueId = async (leagueId: string, auth: AuthenticationHeader): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/league/${leagueId}/match`,
    {
      method: 'GET',
      headers: {
        ...auth,
      },
    }
  );
};

export const postMatch = async (leagueId: string, match: Match, auth: AuthenticationHeader): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/league/${leagueId}/match`,
    {
      method: 'POST',
      headers: {
        ...auth,
      },
      body: JSON.stringify(match),
    }
  );
};
