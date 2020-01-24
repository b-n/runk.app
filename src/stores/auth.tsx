import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

interface AuthStore {
  auth: Auth
  setAuth: Dispatch<SetStateAction<Auth>>
}

const context = createContext({} as AuthStore);

export const AuthProvider: React.FC = ({ children }) => {
  const [ auth, setAuth ] = useState({
    isAuthed: false
  });

  return (
    <context.Provider
      value= {{
        auth,
        setAuth,
      }}
      children={children}
    />
  )
}

export const useAuth = () => useContext(context);
