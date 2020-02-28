import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import { LeagueUser } from '../../../interfaces/League';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
  },
  name: {
    width: '100%',
  },
  score: {
    alignSelf: 'flex-end',
  },
}));

interface RunkeeProps extends LeagueUser {
  onClick: (id: string) => void;
}

const Runkee: React.FC<RunkeeProps> = ({ displayName, score, id, pictureURL, onClick }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem button onClick={() => onClick(id)}>
        <ListItemAvatar>
          <Avatar src={pictureURL} alt={displayName.substring(1)} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box component="div" className={classes.content}>
              <Typography className={classes.name}>{displayName}</Typography>
              <Typography variant="button" className={classes.score}>{score}</Typography>
            </Box>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default React.memo(Runkee);
