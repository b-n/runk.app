import React from 'react'

import { League } from '../../../interfaces/League'

interface HistoryProps {
  league: League
}

const History: React.FC<HistoryProps>  = ({ league }) => (
  <>
    History: {league.name}
  </>
)

export default React.memo(History)
