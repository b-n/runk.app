import React, { createContext, useContext, useState } from 'react';

import { useAuth } from './auth'

import { League } from '../interfaces/League';
import { AuthenticationHeader } from '../interfaces/Auth';

interface LeaguesState {
  league: League | undefined;
  leagues: League[];
  hasUserLeagues: boolean;
}

interface LeaguesStore extends LeaguesState {
  getLeague: (id: string) => void;
  loadUserLeagues: () => void;
}

interface UserLeague {
  id: string;
  displayName: string;
  description: string;
  pictureURL: string;
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
  hasUserLeagues: false,
  leagues: [
    {
      id: '123456789',
      name: 'Guidion Ping Pong',
      description: 'Guidion Ping Pong league for all those that kick ass',
      image_url: 'https://freepngimg.com/download/ping_pong/2-2-ping-pong-download-png.png',
    },
    {
      id: '987654321',
      name: 'Guidion Foosball',
      description: 'Foosball league for super serious people. Meets every friday.',
      image_url: 'http://timenerdworld.files.wordpress.com/2013/08/foosball.jpg?w=720&h=480&crop=1',
    },
  ],
}

const LeaguesContext = createContext({} as LeaguesStore);

export const LeaguesProvider: React.FC = ({ children }) => {
  const { getAuthenticationHeader } = useAuth()
  const [ state, setState ] = useState(defaultState)

  const getLeague = async (id: string) => {
    const authHeader = await getAuthenticationHeader()
    console.log(authHeader)
    setState({
      ...state
    })
  }

  const loadUserLeagues = () => {
    getAuthenticationHeader()
      .then(getUserLeagues)
      .then(result => setState({
        ...state,
        leagues: result
      }))
  }

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
