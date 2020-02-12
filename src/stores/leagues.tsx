import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './auth'
import { League } from '../interfaces/League';
import LeaguesService from '../services/leagues';

interface LeaguesState {
  league: League | undefined
  leagues: League[]
  isLoading: boolean
}

interface LeaguesStore extends LeaguesState {
  getLeague: (id: string) => void
  loadUserLeagues: () => void
}

const defaultState: LeaguesState = {
  league: undefined,
  isLoading: false,
  leagues: [],
}

const LeaguesContext = createContext({} as LeaguesStore);

export const LeaguesProvider: React.FC = ({ children }) => {
  const { isAuthed, isAuthing, authenticationHeader } = useAuth();

  const [ state, setState ] = useState(defaultState);

  const getLeague = async (id: string) => {
    setState({
      ...state
    });
  };

  const loadUserLeagues = () => {
    setState({
      ...state,
      isLoading: true,
      leagues: [],
    });
  };

  useEffect(() => {
    if (state.isLoading && !isAuthing) {
      if (!isAuthed || !authenticationHeader) {
        setState({
          ...state,
          isLoading: false,
          leagues: [],
        });
        return;
      }

      LeaguesService.getUserLeagues(authenticationHeader).then(result => {
        setState({
          ...state,
          isLoading: false,
          leagues: result
        })
      });
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
  );
};

export const useLeagues = () => useContext(LeaguesContext);
