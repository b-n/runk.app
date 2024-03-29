import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';

import { Match } from '../../../interfaces/Match';
import { League, LeagueUser } from '../../../interfaces/League';

import { useAuth } from '../../../stores';
import { useMatchService } from '../../../services/match';
import { useWindowDimensions } from '../../../hooks/window';

import Outcomes from './Outcomes';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  option: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  optionName: {
    width: '100%',
    marginLeft: 8,
  },
  optionScore: {},
  user: {
    marginBottom: 16,
  },
  slider: {
    width: '60%',
    alignSelf: 'center',
  },
  outcomes: {
    width: '200px',
    alignSelf: 'center',
    marginTop: '16px',
  },
});

interface MatchEditorProps {
  match: Match;
  league: League;
  open: boolean;
  onClose: (match?: Match) => void;
}

const MatchEditor: React.FC<MatchEditorProps> = ({ onClose, open, match, league }) => {
  const { t } = useTranslation();
  const windowHeight = useWindowDimensions()[1];
  const classes = useStyles();
  const { createMatch } = useMatchService();
  const { authenticationHeader } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [user1, setUser1] = useState<LeagueUser | null>(null);
  const [user2, setUser2] = useState<LeagueUser | null>(null);
  const [winner, setWinner] = useState(1);

  useEffect(() => {
    const u1 = Object.values(match.users).find(user => user.team === 1);
    const u2 = Object.values(match.users).find(user => user.team === 2);

    setUser1(u1 ? league.users![u1.id] : null);
    setUser2(u2 ? league.users![u2.id] : null);
  }, [match.users, league.users]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (!user1 || !user2 || !league.id) {
      return;
    }
    setIsLoading(true);
    const toSave: Match = {
      date: new Date(),
      winner: winner === 0 ? 1 : (winner === 1 ? 0 : 2),
      users: {
        [user1.id]: {
          id: user1.id,
          team: 1,
        },
        [user2.id]: {
          id: user2.id,
          team: 2,
        },
      },
    };

    createMatch(authenticationHeader!, league.id, toSave)
      .then(() => {
        onClose();
      });
  };

  const handleChange = (setter: Dispatch<SetStateAction<LeagueUser | null>>) => (_: React.ChangeEvent<{}>, value: LeagueUser | null) => {
    setter(value);
  };

  const handleWinnerChange = (_: React.ChangeEvent<{}>, value: number | number[]) => {
    setWinner(value as number);
  };

  const renderOption = (option: any) => (
    <Box className={classes.option}>
      <Avatar src={option.pictureURL} />
      <Typography variant="body1" className={classes.optionName}>
        {option.displayName}
      </Typography>
      <Typography variant="button" className={classes.optionScore}>
        {option.score}
      </Typography>
    </Box>
  );

  const renderInput = (label: string) => (params: any) => (
    <TextField
      label={label}
      variant="outlined"
      inputProps={{ autoComplete: 'new-password' }}
      required={true}
      {...params}
    />
  );

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth={true}>
      {
        match && league &&
        <>
          <DialogTitle>{match.id ? t('match:Edit Match') : t('match:Submit a match')}</DialogTitle>
          <DialogContent className={classes.content}>
            <Autocomplete
              className={classes.user}
              options={Object.values(league.users!)}
              getOptionLabel={option => option.displayName}
              getOptionSelected={(option, value) => option.id === value.id}
              value={user1}
              onChange={handleChange(setUser1)}
              renderOption={renderOption}
              renderInput={renderInput(t('match:Player 1'))}
            />
            <Autocomplete
              className={classes.user}
              options={Object.values(league.users!)}
              getOptionLabel={option => option.displayName}
              getOptionSelected={(option, value) => option.id === value.id}
              value={user2}
              onChange={handleChange(setUser2)}
              renderOption={renderOption}
              renderInput={renderInput(t('match:Player 2'))}
            />
            <Typography>{t('match:Outcome')}</Typography>
            <Slider
              className={classes.slider}
              value={winner}
              onChange={handleWinnerChange}
              step={null}
              min={0}
              max={2}
              track={false}
              marks={[
                { value: 0, label: user1 ? user1.displayName : t('match:Player 1') },
                { value: 1, label: t('match:Draw') },
                { value: 2, label: user2 ? user2.displayName : t('match:Player 2') },
              ]}
            />
            {
              windowHeight > 568 && user1 && user2 &&
              <Outcomes
                className={classes.outcomes}
                elo1={user1.score}
                elo2={user2.score}
                outcome={winner === 0 ? 1 : (winner === 1 ? 0.5 : 0)}
              />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('common:Cancel')}</Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isLoading || !user1 || !user2 || user1.id === user2.id}
              color="primary"
            >
              {t('common:Save')}
            </Button>
          </DialogActions>
        </>
      }
    </Dialog>
  );
};

export default React.memo(MatchEditor);
