import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface UserStore {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const UserContext = createContext({} as UserStore);

export const UserProvider: React.FC = ({ children }) => {
  const [ user, setUser ] = useState({ name: '' });

  return (
    <UserContext.Provider
      value= {{
        user,
        setUser
      }}
      children={children}
    />
  )
}

export const useUser = () => useContext(UserContext);
