import React, { createContext, useContext } from 'react'

interface LeaguesStore {
  leagues: League[]
}

const LeaguesContext = createContext({} as LeaguesStore);

export const LeaguesProvider: React.FC = ({ children }) => {
  return (
    <LeaguesContext.Provider
      value= {{
        leagues: [
          {
            id: '123456789',
            name: 'Guidion Ping Pong',
            description: 'Guidion Ping Pong league for all those that kick ass',
            image_url: 'https://freepngimg.com/download/ping_pong/2-2-ping-pong-download-png.png',
            invite_code: 'guidion_ping_pong',
          },
          {
            id: '987654321',
            name: 'Guidion Foosball',
            description: 'Foosball league for super serious people. Meets every friday.',
            image_url: 'http://timenerdworld.files.wordpress.com/2013/08/foosball.jpg?w=720&h=480&crop=1',
            invite_code: 'guidion_foosball',
          },
        ]
      }}
      children={children}
    />
  )
}

export const useLeagues = () => useContext(LeaguesContext);
