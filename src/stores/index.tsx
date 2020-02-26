import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import { UserProvider, useUser, useUserMutations } from './user';
import { LeaguesProvider, useLeagues, useLeaguesMutations } from './leagues';
import { AuthProvider, useAuth, useAuthMutations } from './auth';
import Theme from '../theme';

const GlobalProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={createMuiTheme(Theme)}>
    <AuthProvider>
      <UserProvider>
        <LeaguesProvider>
          {children}
        </LeaguesProvider>
      </UserProvider>
    </AuthProvider>
  </ThemeProvider>
);

export {
  GlobalProvider,
  useAuth,
  useAuthMutations,
  useLeagues,
  useLeaguesMutations,
  useUser,
  useUserMutations,
};
