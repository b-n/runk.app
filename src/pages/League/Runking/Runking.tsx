import React from 'react'

import RunkeeList from './RunkeeList'
import Runkee from './Runkee'

import { League } from '../../../interfaces/League'

interface RunkingProps {
  league: League
}

const Runking: React.FC<RunkingProps>  = ({ league }) => (
  <>
    {
      league.players && 
      <RunkeeList>
        {
          league.players.map(player => (
            <Runkee key={player.id} {...player} />
            ))
        }
      </RunkeeList>
    }
  </>
)

export default React.memo(Runking)
