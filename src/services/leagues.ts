import { League, NewLeague } from '../interfaces/League';
import { getUserInfo } from '../api/user';
import { putLeague } from '../api/league';
import { useAuth, AuthState } from '../stores/auth';

interface UserLeague {
  id: string
  displayName: string
  description: string
  pictureURL: string
}

const getUserLeagues = ({ isAuthed, authenticationHeader }: AuthState) => async (): Promise<Array<League>> => {
  if (!isAuthed || !authenticationHeader) {
    throw new Error('Need to be authenticated')
  }
  return getUserInfo(authenticationHeader)
    .then(result => result.json())
    .then(result => {
      return Object.values(result.leagues).map(league => {
        const {
          id,
          description,
          displayName,
          pictureURL,
        } = league as UserLeague

        return {
          id,
          name: displayName,
          image_url: pictureURL,
          description,
        }
      })
    });
};

const createLeague = ({ isAuthed, authenticationHeader }: AuthState) => async (league: NewLeague): Promise<League> => {
  if (!isAuthed || !authenticationHeader) {
    throw new Error('Need to be authenticated')
  }
  return putLeague(league, authenticationHeader)
    .then(result => result.json())
    .then(result => {
      return result as League
    })
}

export const useLeagueService = () => {
  const auth = useAuth()

  return {
    createLeague: createLeague(auth),
    getUserLeagues: getUserLeagues(auth),
  }
}
