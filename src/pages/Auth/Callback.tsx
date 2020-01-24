import React, { useEffect, useState } from 'react';

import queryString from 'query-string';

import {
  useLocation,
  useHistory,
  Link,
} from 'react-router-dom';

import { useAuth } from '../../stores';

const Callback: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { code, state } = queryString.parse(location.search);

  const [status, setStatus] = useState('Waiting');

  const { setAuth } = useAuth();

  useEffect(() => {
    fetch(
      `http://localhost:3001/auth/token?grant_type=authorization_code&code=${code}&state=${state}`,
      {
        method: 'GET',
      }
    )
      .then(result => result.json())
      .then(result => {
        setAuth({ isAuthed: true, ...result })
        setStatus('Done')
        history.push('/')
      });
  }, [code, state]);

  return (
    <div>
      {status}
      <Link to="/login">Login</Link>
    </div>
  )
};

export default React.memo(Callback);
