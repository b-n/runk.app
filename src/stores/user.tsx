import React, { createContext, useContext, useState, useEffect } from 'react';

import { useUserService } from '../services/user';

import { User } from '../interfaces/User';

import { useAuth } from './auth'

interface UserStore {
  user?: User;
  isLoading: boolean;
};

interface UserMutations {
  loadUser: () => void;
}

const UserContext = createContext({} as UserStore);
const UserMutationContext = createContext({} as UserMutations);

export const UserProvider: React.FC = ({ children }) => {
  const authState = useAuth();
  const { isAuthed, initing, authenticationHeader } = authState;
  const { getUser } = useUserService();

  const [ state, setState ] = useState<UserStore>({
    isLoading: false,
  })

  const loadUser = () => {
    setState({
      ...state,
      isLoading: true,
    })
  }

  useEffect(() => {
    if (!initing) {
      if (!isAuthed) {
        setState({
          user: undefined,
          isLoading: false,
        })
        return
      }

      getUser(authenticationHeader!)
        .then(user => setState({
          isLoading: false,
          user,
        }))
    }
  }, [initing, isAuthed, getUser, authenticationHeader])

  return (
    <UserContext.Provider value={state} >
      <UserMutationContext.Provider
        value={{
          loadUser,
        }}
      >
        {children}
      </UserMutationContext.Provider>
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);
export const useUserMutations = () => useContext(UserMutationContext);
