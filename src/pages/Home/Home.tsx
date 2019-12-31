import React from 'react'

import { useAuth } from '../../stores'

const Home: React.FC = () => {
  const { auth } = useAuth();
  return (
    <div>
      Home
      { auth.isAuthed && 'Authed' }
    </div>
  )
}

export default React.memo(Home);
