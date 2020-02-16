import React, { createContext, useContext, useState, useEffect } from 'react';

import UserService from '../services/user';

import { User } from '../interfaces/User';

import { useAuth } from './auth'

interface UserStore {
  user?: User;
  isLoading: boolean;
};

interface UserMutations {
  setName: (name: string) => void;
  loadUser: () => void;
}

const UserContext = createContext({} as UserStore);
const UserMutationContext = createContext({} as UserMutations);

export const UserProvider: React.FC = ({ children }) => {
  const { isAuthed, isAuthing, authenticationHeader } = useAuth();


  const [ state, setState ] = useState<UserStore>({
    isLoading: false,
  })

  const loadUser = () => {
    setState({
      ...state,
      isLoading: true,
    })
  }

  const setName = (name: string) => {
    setState({
      ...state,
      user: {
        ...state.user,
        name,
      }
    })
  }

  useEffect(() => {
    if (state.isLoading && !isAuthing) {
      if (!isAuthed || !authenticationHeader) {
        setState({
          ...state,
          user: undefined,
          isLoading: false,
        })
        return
      }

      UserService.getUser(authenticationHeader)
        .then(user => setState({
          ...state,
          user,
        }))
    }
  }, [state.isLoading, isAuthing])

  return (
    <UserContext.Provider value={state} >
      <UserMutationContext.Provider
        value={{
          setName,
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
