import { AuthenticationHeader } from '../interfaces/Auth';

export const getUserInfo = async (auth: AuthenticationHeader): Promise<Response> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/user`,
    {
      method: 'GET',
      headers: {
        ...auth,
      },
    }
  );
};
