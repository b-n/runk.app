import React from 'react'

import RunkeeList from './RunkeeList'
import Runkee from './Runkee'

import { League } from '../../../interfaces/League'

interface RunkingProps {
  league: League
  onClick: (id: string) => void
}

const Runking: React.FC<RunkingProps>  = ({ league, onClick }) => {
  return (
    <>
      {
        league.users && 
        <RunkeeList>
          {
            Object.values(league.users)
            .filter(player => player.isActive)
            .map(player => (
              <Runkee onClick={onClick} key={player.id} {...player} />
              ))
          }
        </RunkeeList>
      }
    </>
  )
}

export default React.memo(Runking)
