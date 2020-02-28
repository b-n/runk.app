import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';

import { useAuth } from './auth';
import { League } from '../interfaces/League';
import { useLeagueService } from '../services/leagues';

interface LeaguesState {
  leagues: League[];
  isLoading: boolean;
}

interface LeaguesMutations {
  loadUserLeagues: () => void;
}

const defaultState: LeaguesState = {
  isLoading: false,
  leagues: [],
};

export const LeaguesContext = createContext({} as LeaguesState);
export const LeaguesMutationContext = createContext({} as LeaguesMutations);

const LeaguesProvider: React.FC = ({ children }) => {
  const { getUserLeagues } = useLeagueService();
  const { initing, authenticationHeader } = useAuth();

  const [state, setState] = useState(defaultState);

  const loadUserLeagues = useCallback(() => {
    setState({
      isLoading: true,
      leagues: [],
    });
  }, []);

  useEffect(() => {
    if (!initing && state.isLoading && authenticationHeader) {
      getUserLeagues(authenticationHeader)
        .then(result => {
          setState({
            isLoading: false,
            leagues: result,
          });
        });
    }
  }, [initing, state.isLoading, authenticationHeader, getUserLeagues]);

  return (
    <LeaguesContext.Provider
      value= {{
        ...state,
      }}
    >
      <LeaguesMutationContext.Provider
        value={{
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
export const useLeaguesMutations = () => useContext(LeaguesMutationContext);
