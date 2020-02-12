import React from 'react'

import { Logo } from '../../components/Logo'

//Components
import { GoogleSignIn } from '../../components/LoginButton'

//Utils
import { useLoginLinks } from '../../hooks/login'

const Login: React.FC = () => {
  const loginLinks = useLoginLinks();

  return (
    <div className="Login">
      <header className="Login-header">
        <Logo
          className="logo"
          animateTail={true}
          width={180}
          height={180}
        />
      </header>
      <section>
      {loginLinks && loginLinks.length === 1 && (
        <GoogleSignIn href={loginLinks[0].url}/>
      )}
      </section>
    </div>
  );
}

export default React.memo(Login);
