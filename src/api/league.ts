import { AuthenticationHeader } from '../interfaces/Auth';
import { NewLeague } from '../interfaces/League';

export const putLeague = async (league: NewLeague, auth: AuthenticationHeader): Promise<Response> => {
  const { displayName, pictureURL, description } = league;
  return fetch(
    `${process.env.REACT_APP_SERVER}/league`,
    {
      method: 'POST',
      headers: {
        ...auth,
      },
      body: JSON.stringify({
        displayName,
        pictureURL,
        description,
      }),
    }
  );
};

interface QueryOptions {
  id?: string;
}

export const query = async ({ id }: QueryOptions, auth: AuthenticationHeader): Promise<Response> => {
  if (id) {
    return fetch(
      `${process.env.REACT_APP_SERVER}/league/${id}`,
      {
        method: 'GET',
        headers: {
          ...auth,
        },
      }
    );
  }

  throw new Error('Unsupported Query');
};

interface ActionProps {
  id: string;
  action: string;
  body?: any;
}

export const doAction = async ({ id, action, body }: ActionProps, auth: AuthenticationHeader): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/league/${id}/${action}`,
    {
      method: 'POST',
      headers: {
        ...auth,
      },
      body: body ? JSON.stringify(body) : null,
    }
  );
};

export const getDiscover = async (): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/discover`,
    {
      method: 'GET',
    }
  );
};
