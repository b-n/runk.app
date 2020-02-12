import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import { UserProvider, useUser } from './user';
import { LeaguesProvider, useLeagues } from './leagues';
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
  AuthProvider,
  DiscoverProvider,
  GlobalProvider,
  LeaguesProvider,
  useAuth,
  useDiscover,
  useLeagues,
  UserProvider,
  useUser,
};
