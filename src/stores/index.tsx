import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import { UserProvider, useUser, useUserMutations } from './user';
import { LeaguesProvider, useLeagues, useLeaguesMutations } from './leagues';
import { DiscoverProvider, useDiscover } from './discover';
import { AuthProvider, useAuth } from './auth';
import Theme from '../theme';

const GlobalProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={createMuiTheme(Theme)}>
    <AuthProvider>
      <UserProvider>
        <LeaguesProvider>
          <DiscoverProvider>
            {children}
          </DiscoverProvider>
        </LeaguesProvider>
      </UserProvider>
    </AuthProvider>
  </ThemeProvider>
);

export {
  GlobalProvider,
  useAuth,
  useDiscover,
  useLeagues,
  useLeaguesMutations,
  useUser,
  useUserMutations,
};
