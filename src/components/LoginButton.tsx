import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Google1x from '../static/btn_google_signin_dark_normal_web.png';
import Google2x from '../static/btn_google_signin_dark_normal_web@2x.png';

interface LoginButtonProps {
  href: string;
}

const useStyles = makeStyles(() => ({
  google: {
  },
}));

const GoogleSignIn: React.FC<LoginButtonProps> = ({ href }: LoginButtonProps) => {
  const classes = useStyles();

  return (
    <a href={href} className={classes.google}>
      <img
        srcSet={`
          ${Google1x} 1x,
          ${Google2x} 2x
        `}
        src={Google1x}
        alt="Google"
      />
    </a>
  );
};

export {
  GoogleSignIn,
};
