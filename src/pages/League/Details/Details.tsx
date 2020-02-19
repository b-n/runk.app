import React from 'react'

import { League } from '../../../interfaces/League'

interface DetailsProps {
  league: League
}

const Details: React.FC<DetailsProps>  = ({ league }) => (
  <>
    Details: {league.name}
  </>
)

export default React.memo(Details)
