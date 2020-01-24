import React from 'react';

import { UserProvider, useUser } from './user';
import { LeaguesProvider, useLeagues } from './leagues';
import { DiscoverProvider, useDiscover } from './discover';
import { AuthProvider, useAuth } from './auth';

const GlobalProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <LeaguesProvider>
        <DiscoverProvider>
          {children}
        </DiscoverProvider>
      </LeaguesProvider>
    </UserProvider>
  </AuthProvider>
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
