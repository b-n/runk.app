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

  const { doAuth } = useAuth();

  useEffect(() => {
    doAuth(code as string, state as string)
      .then(result => {
        if (!result) {
          setStatus('Failed');
          return;
        }
        setStatus('Success');
        history.push('/');
      })
  }, [code, state]);

  return (
    <div>
      {status}
      <Link to="/login">Login</Link>
    </div>
  )
};

export default React.memo(Callback);
