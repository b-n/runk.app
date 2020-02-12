import { AuthenticationHeader } from '../interfaces/Auth';
import { League } from '../interfaces/League';
import { getUserInfo } from '../api/user';

interface UserLeague {
  id: string
  displayName: string
  description: string
  pictureURL: string
}

const getUserLeagues = async (auth: AuthenticationHeader): Promise<Array<League>> => {
  return getUserInfo(auth).then(result =>
    result.json()
  ).then(result => {
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

export default {
  getUserLeagues
};
