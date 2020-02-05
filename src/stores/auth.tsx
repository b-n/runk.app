import React, { createContext, useContext, useEffect, useState } from 'react';
import addSeconds from 'date-fns/addSeconds'
import isBefore from 'date-fns/isBefore'

import { AuthToken, AuthenticationHeader } from '../interfaces/Auth';

interface AuthState {
  isAuthed: boolean;
  token?: AuthToken;
}

interface AuthStore extends AuthState {
  doAuth: (code: string, authState: string) => Promise<boolean>;
  getAuthenticationHeader: () => Promise<AuthenticationHeader>;
};

const context = createContext({} as AuthStore);

const getAuthToken = async (code: string, state: string): Promise<AuthToken> => {
  return fetch(
    `http://localhost:3001/auth/token?grant_type=authorization_code&code=${code}&state=${state}`,
    {
      method: 'GET',
    }
  )
    .then(result => result.json())
    .then(result => {
      console.log(result)
      if (!result.access_token) {
        throw new Error('Could not auth')
      }
      return result
    })
}

const getRefreshedToken = async(refreshToken: string): Promise<AuthToken> => {
  return fetch(
    `http://localhost:3001/auth/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
    {
      method: 'GET',
    }
  )
    .then(result => result.json())
    .then(result => {
      if (!result.access_token) {
        throw new Error('Could not auth')
      }
      return result
    })
}

export const AuthProvider: React.FC = ({ children }) => {
  const [ state, setState ] = useState({
    isAuthed: false,
    token: undefined
  } as AuthState)

  const setToken = (token: AuthToken) => {
    setState({
      ...state,
      token: {
        ...token,
        expires: addSeconds(new Date(), token.expires_in),
      },
      isAuthed: true,
    })
    localStorage.setItem('AuthToken', JSON.stringify(token))
  }

  const deAuth = () => {
    setState({
      ...state,
      token: undefined,
      isAuthed: false,
    })
  }

  useEffect(() => {
    try {
      const token = localStorage.getItem('AuthToken')
      if (token) {
        getRefreshedToken(JSON.parse(token).refresh_token)
          .then(result => setToken(result))
          .catch(e => deAuth())
      } else {
        deAuth()
      }
    } catch (e) {
      deAuth()
    }
  }, [])

  const doAuth = async (code: string, authState: string): Promise<boolean> => {
    return getAuthToken(code, authState)
      .then(result => {
        setToken(result)
        return true
      })
      .catch(e => {
        deAuth()
        return false
      })
  }

  const getAuthenticationHeader = async(): Promise<AuthenticationHeader> => {
    const { isAuthed, token } = state
    if (!isAuthed || !token) {
      throw new Error('Not authed')
    }
    const { expires, refresh_token } = token

    if (isBefore(expires.getTime(), new Date().getTime())) {
      await getRefreshedToken(refresh_token)
        .then(result => setToken(result))
        .catch(e => deAuth()) 
    }

    if (!state.token) {
      throw new Error('Not Authed')
    }
    
    return {
      Authorization: `${state.token.token_type} ${state.token.access_token}`,
    }
  }

  return (
    <context.Provider
      value= {{
        ...state,
        doAuth,
        getAuthenticationHeader,
      }}
      children={children}
    />
  )
};

export const useAuth = () => useContext(context);
