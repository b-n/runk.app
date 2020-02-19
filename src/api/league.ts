import { AuthenticationHeader } from '../interfaces/Auth';
import { NewLeague } from '../interfaces/League'

export const putLeague = async (league: NewLeague, auth: AuthenticationHeader): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/league`,
    {
      method: 'POST',
      headers: {
        ...auth,
      },
      body: JSON.stringify({
        displayName: league.name,
        pictureURL: league.image_url,
        description: league.description,
      })
    }
  );
};
