import React, { createContext, useContext } from 'react';

import { League } from '../interfaces/League';

interface DiscoverStore {
  leagues: League[];
}

const DiscoverContext = createContext({} as DiscoverStore);

export const DiscoverProvider: React.FC = ({ children }) => {
  return (
    <DiscoverContext.Provider
      value= {{
        leagues: [
          {
            id: '123456789',
            name: 'Guidion Chess Club',
            description: 'Beacuse real man and woman play a real game.',
            image_url: 'https://www.newinchess.com/media/catalog/product/cache/5c623269a5342e27b24699dbabe15023/d/g/dgt_smart_board_with_electronic_plastic_pieces_2_.jpg',
            invite_code: 'guidion_ping_pong',
            players_amount: 13,
          },
          {
            id: '987654321',
            name: 'Guidion Scholen',
            description: 'I have no idea how the name actually is.',
            image_url: 'http://timenerdworld.files.wordpress.com/2013/08/foosball.jpg?w=720&h=480&crop=1',
            invite_code: 'guidion_foosball',
            players_amount: 4,
          },
        ]
      }}
      children={children}
    />
  )
};

export const useDiscover = () => useContext(DiscoverContext);
