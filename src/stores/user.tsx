import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import { User } from '../interfaces/User';

interface UserStore {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const UserContext = createContext({} as UserStore);

export const UserProvider: React.FC = ({ children }) => {
  const [ user, setUser ] = useState<User>({ name: 'testing_name', img: 'https://cdn.shopify.com/s/files/1/0739/6727/products/reflective-motorcycle-sticker-fuck-you-2-pack_2000x.png?v=1499661563' });

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
