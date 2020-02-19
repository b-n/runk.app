import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar'

import { LeagueUser } from '../../../interfaces/League'

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
  },
  name: {
    width: '100%',
  },
  score: {
    alignSelf: 'flex-end',
  }
}));

interface RunkeeProps extends LeagueUser {}

const Runkee: React.FC<RunkeeProps> = ({ name, score, id, image_url }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem button>
        <ListItemAvatar>
          <Avatar src={image_url} alt={name.substring(1)} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box component="div" className={classes.content}>
              <Typography className={classes.name}>{name}</Typography> 
              <Typography variant="button" className={classes.score}>{score}</Typography> 
            </Box>
          }
        />
      </ListItem>
      <Divider />
    </>
  )
}

export default React.memo(Runkee)
