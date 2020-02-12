import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './auth'

import { League } from '../interfaces/League';
import { AuthenticationHeader } from '../interfaces/Auth';

interface LeaguesState {
  league: League | undefined
  leagues: League[]
  isLoading: boolean
}

interface LeaguesStore extends LeaguesState {
  getLeague: (id: string) => void
  loadUserLeagues: () => void
}

interface UserLeague {
  id: string
  displayName: string
  description: string
  pictureURL: string
}
const getUserLeagues = async (auth: AuthenticationHeader): Promise<Array<League>> => {
  return fetch(
    `${process.env.REACT_APP_SERVER}/user`,
    {
      method: 'GET',
      headers: {
        ...auth,
      },
    }
  )
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
    })
}

const defaultState: LeaguesState = {
  league: undefined,
  isLoading: false,
  leagues: [],
}

const LeaguesContext = createContext({} as LeaguesStore);

export const LeaguesProvider: React.FC = ({ children }) => {
  const { isAuthed, isAuthing, authenticationHeader } = useAuth()

  const [ state, setState ] = useState(defaultState)

  const getLeague = async (id: string) => {
    setState({
      ...state
    })
  }

  const loadUserLeagues = () => {
    setState({
      ...state,
      isLoading: true,
    })
  
  }

  useEffect(() => {
    if (state.isLoading && !isAuthing) {
      if (!isAuthed || !authenticationHeader) {
        setState({
          ...state,
          isLoading: true,
          leagues: [],
        })
        return
      }
      getUserLeagues(authenticationHeader)
        .then(result => {
          setState({
            ...state,
            isLoading: false,
            leagues: result
          })
        })
    }
  }, [ state.isLoading, isAuthing ])
  
  return (
    <LeaguesContext.Provider
      value= {{
        ...state,
        getLeague,
        loadUserLeagues,
      }}
      children={children}
    />
  )
};

export const useLeagues = () => useContext(LeaguesContext);
