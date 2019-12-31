import React from 'react'

import logo from './../../static/logo.svg';

import { useLoginLinks } from '../../hooks/login'

const Login: React.FC = () => {
  const loginLinks = useLoginLinks();

  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
      </header>
      <section>
      {loginLinks && loginLinks.map(({provider, url}) => (
        <a href={url}>{provider}</a>
      ))}
      </section>
    </div>
  );
}

export default React.memo(Login);
