import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { User } from '../interfaces/User';

interface UserStore {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

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
};

export const useUser = () => useContext(UserContext);
