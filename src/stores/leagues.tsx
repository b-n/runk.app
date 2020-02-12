import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './auth'
import { League } from '../interfaces/League';
import LeaguesService from '../services/leagues';

interface LeaguesState {
  league: League | undefined
  leagues: League[]
  isLoading: boolean
}

interface LeaguesMutationStore {
  getLeague: (id: string) => void
  loadUserLeagues: () => void
}

const defaultState: LeaguesState = {
  league: undefined,
  isLoading: false,
  leagues: [],
};

export const LeaguesContext = createContext({} as LeaguesState);
export const LeaguesMutationContext = createContext({} as LeaguesMutationStore);

const LeaguesProvider: React.FC = ({ children }) => {
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
      }}
    >
      <LeaguesMutationContext.Provider
        value={{
          getLeague,
          loadUserLeagues,
        }}
      >
        {children}
      </LeaguesMutationContext.Provider>
    </LeaguesContext.Provider>
  );
};

export { LeaguesProvider };

export const useLeagues = () => useContext(LeaguesContext);
export const useLeaguesMutations= () => useContext(LeaguesMutationContext);
