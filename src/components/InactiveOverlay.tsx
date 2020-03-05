import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inactive: {
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    left: '0px',
    top: '0px',
  },
});

interface InactiveOverlayProps {
  show: boolean;
  onClick?: () => void;
}

const InactiveOverlay: React.FC<InactiveOverlayProps> = ({ show, children, onClick }) => {
  const classes = useStyles();

  if (!show) {
    return null;
  }

  return (
    <div className={classes.inactive} onClick={onClick}>
      { children }
    </div>
  );
};

export default React.memo(InactiveOverlay);
