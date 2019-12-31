import React from 'react'
import { UserProvider, useUser } from './user'
import { AuthProvider, useAuth } from './auth'

const GlobalProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      {children}
    </UserProvider>
  </AuthProvider>
)

export {
  useUser,
  UserProvider,
  useAuth,
  AuthProvider,
  GlobalProvider,
}
