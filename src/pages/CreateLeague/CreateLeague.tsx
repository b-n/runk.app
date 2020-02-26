import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

// Utils
import { NewLeague } from '../../interfaces/League'
import { useLeagueService } from '../../services/leagues'

// Components
import Title from '../../components/Title'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    padding: 20,
  },
  avatar: {
    width: '120px',
    height: '120px',
    alignSelf: 'center',
  },
  buttons: {
    marginTop: '1em',
    alignSelf: 'flex-end',
  },
  save: {
    marginLeft: '1em',
  }
});

const CreateLeague: React.FC = () => {
  const classes = useStyles();
  const LeagueService = useLeagueService();
  const history = useHistory();
  const [ newLeague, setNewLeague ] = useState({
    pictureURL: '',
    displayName: '',
    description: '',
  } as NewLeague);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLeague({
      ...newLeague,
      [field]: event.target.value,
    })
  }

  const saveLeague = async () => {
    LeagueService.createLeague(newLeague)
      .then(league => {
        history.push('/leagues');
      })
  }

  return (
    <div>
      <Title>New League</Title>
      <Paper className={classes.root}>
        <Avatar
          src={newLeague.pictureURL}
          alt={newLeague.displayName.substring(1)}
          variant="rounded"
          className={classes.avatar}
        />
        <TextField
          error={false}
          label={'Avatar URL'}
          value={newLeague.pictureURL}
          margin="normal"
          onChange={handleChange('pictureURL')}
        />
        <TextField
          error={false}
          label={'League Name'}
          margin="normal"
          value={newLeague.displayName}
          onChange={handleChange('displayName')}
        />
        <TextField
          error={false}
          label={'Description'}
          margin="normal"
          value={newLeague.description}
          onChange={handleChange('description')}
          multiline
        />
        <section className={classes.buttons}>
          <Button 
            color="default"
            onClick={() => history.push('/leagues')}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.save}
            disableElevation
            onClick={() => saveLeague()}
          >
            Create
          </Button>
        </section>
      </Paper>
    </div>
  )
};

export default React.memo(CreateLeague);
