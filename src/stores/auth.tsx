import React, { createContext, useContext, useEffect, useState } from 'react';
import addSeconds from 'date-fns/addSeconds'

import { AuthToken, AuthenticationHeader } from '../interfaces/Auth';

export interface AuthState {
  isAuthed: boolean
  isAuthing: boolean
  token?: AuthToken
  authenticationHeader?: AuthenticationHeader
}

interface AuthMutations {
  doAuth: (code: string, authState: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext({} as AuthState);
const AuthMutationContext = createContext({} as AuthMutations)

const getAuthToken = async (code: string, state: string): Promise<AuthToken> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/auth/token?grant_type=authorization_code&code=${code}&state=${state}&redirect_uri=${window.location.origin}/auth/callback`,
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

const getRefreshedToken = async(refreshToken: string): Promise<AuthToken> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/auth/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
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
    isAuthing: true,
    token: undefined
  } as AuthState)

  const setToken = (token: AuthToken) => {
    setState({
      ...state,
      token: {
        ...token,
        expires: addSeconds(new Date(), token.expires_in),
      },
      isAuthing: false,
      isAuthed: true,
      authenticationHeader: {
        Authorization: `${token.token_type} ${token.access_token}`,
      }
    })
    localStorage.setItem('AuthToken', JSON.stringify(token))
  }

  const deAuth = () => {
    setState({
      ...state,
      token: undefined,
      isAuthing: false,
      isAuthed: false,
      authenticationHeader: undefined,
    })
  }

  const doRefresh = (token: AuthToken) => {
    getRefreshedToken(token.refresh_token)
      .then(result => setToken(result))
      .catch(e => deAuth())
  }

  useEffect(() => {
    try {
      const token = localStorage.getItem('AuthToken')
      if (token) {
        doRefresh(JSON.parse(token))
      } else {
        deAuth()
      }
    } catch (e) {
      deAuth()
    }
  }, [])

  useEffect(() => {
    if (state.isAuthed && state.token) {
      const refreshTimer = state.token.expires_in - 30
      setTimeout(() => doRefresh(state.token as AuthToken), refreshTimer * 1000)
    }
  }, [ state.isAuthed ])

  const logout = () => {
    localStorage.removeItem('AuthToken')
    setState({
      token: undefined,
      isAuthed: false,
      isAuthing: false,
    })
  }

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

  return (
    <AuthContext.Provider value= {state}>
      <AuthMutationContext.Provider value={{
        doAuth,
        logout,
      }}>
        {children}
      </AuthMutationContext.Provider>
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
export const useAuthMutations = () => useContext(AuthMutationContext)
