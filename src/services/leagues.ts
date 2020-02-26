import { AuthenticationHeader } from '../interfaces/Auth';
import { League, NewLeague } from '../interfaces/League';
import { getUserInfo } from '../api/user';
import { putLeague, query, doAction, getDiscover } from '../api/league';
import { useAuth, AuthState } from '../stores/auth';

interface UserLeague {
  id: string;
  displayName: string;
  description: string;
  pictureURL: string;
}

const getUserLeagues = async (authenticationHeader: AuthenticationHeader): Promise<Array<League>> => {
  return getUserInfo(authenticationHeader)
    .then(result => result.json())
    .then(result => {
      return Object.values(result.leagues).map(league => {
        const { id, description, displayName, pictureURL } = league as UserLeague;
        return {
          id,
          displayName,
          description,
          pictureURL,
        };
      });
    });
};

const getDiscoverLeagues = async (): Promise<Array<League>> => {
  return getDiscover()
    .then(result => result.json())
    .then(result => result as Array<League>);
};

const createLeague = ({ isAuthed, authenticationHeader }: AuthState) => async (league: NewLeague): Promise<League> => {
  if (!isAuthed || !authenticationHeader) {
    throw new Error('Need to be authenticated');
  }
  return putLeague(league, authenticationHeader)
    .then(result => result.json())
    .then(result => {
      return result as League;
    });
};

const getById = async (authenticationHeader: AuthenticationHeader, id: string): Promise<League> => {
  return query({ id }, authenticationHeader)
    .then(result => result.json())
    .then(result => {
      const { id, displayName, description, pictureURL, users } = result;
      return {
        id,
        displayName,
        description,
        pictureURL,
        userAmount: users.length,
        users,
      };
    });
};

const join = ({ isAuthed, authenticationHeader }: AuthState) => async (id: string): Promise<void> => {
  if (!isAuthed || !authenticationHeader) {
    throw new Error('Need to be authenticated');
  }

  return doAction({ id, action: 'join', body: { inviteCode: null } }, authenticationHeader)
    .then(() => undefined);
};

const leave = ({ isAuthed, authenticationHeader }: AuthState) => async (id: string): Promise<void> => {
  if (!isAuthed || !authenticationHeader) {
    throw new Error('Need to be authenticated');
  }

  return doAction({ id, action: 'leave' }, authenticationHeader)
    .then(() => undefined);
};

export const useLeagueService = () => {
  const auth = useAuth();

  return {
    createLeague: createLeague(auth),
    getUserLeagues,
    getById,
    join: join(auth),
    leave: leave(auth),
    getDiscoverLeagues,
  };
};
