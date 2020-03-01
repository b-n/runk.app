import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useParams } from 'react-router-dom';

import TabPanel from '../../components/TabPanel';
import Title from '../../components/Title';
import Runking from './Runking';
import Details from './Details';
import History from './History';
import MatchEditor from '../common/MatchEditor';

import { League } from '../../interfaces/League';
import { Match } from '../../interfaces/Match';
import { useLeagueService } from '../../services/leagues';
import { useAuth } from '../../stores/auth';
import { useUser } from '../../stores/user';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 56px)',
  },
  content: {
    flexShrink: 1,
    overflowY: 'auto',
  },
  fab: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
  },
});

const LeagueComponent: React.FC = () => {
  const classes = useStyles();
  const { getById } = useLeagueService();

  const { id } = useParams();
  const { authenticationHeader } = useAuth();
  const { user } = useUser();

  const [league, setLeague] = useState<League>();
  const [currentTab, setCurrentTab] = useState(0);
  const [currentMatch, setCurrentMatch] = useState<Match>();
  const [matchEditorOpen, setMatchEditorOpen] = useState(false);

  useEffect(() => {
    if (id && authenticationHeader) {
      getById(authenticationHeader!, id)
        .then(result => setLeague(result));
    }
  }, [id, authenticationHeader, getById]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAction = () => {
    getById(authenticationHeader!, id!)
      .then(result => setLeague(result));
  };

  const handleMatchEditorClose = () => {
    setCurrentMatch(undefined);
    setMatchEditorOpen(false);
    getById(authenticationHeader!, id!)
      .then(result => setLeague(result));
  };

  const handleNewMatch = (id: string) => {
    openMatchEditor({
      leagueId: league!.id!,
      date: new Date(),
      users: {
        [id]: {
          id,
          team: 2,
        },
        [user!.id]: {
          id: user!.id,
          team: 1,
        },
      },
    });
  };

  const openMatchEditor = (match: Match) => {
    setCurrentMatch(match);
    setMatchEditorOpen(true);
  };

  return (
    <div className={classes.root}>
      <section>
        <Title>
          {
            league
              ? league.displayName
              : 'League'
          }
        </Title>
        <AppBar position="static">
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Runking" id="0"/>
            <Tab label="History" id="1"/>
            <Tab label="Details" id="2"/>
          </Tabs>
        </AppBar>
      </section>
      <section className={classes.content}>
        <TabPanel currentTab={currentTab} index={0}>
          {league && <Runking league={league} onClick={handleNewMatch}/>}
        </TabPanel>
        <TabPanel currentTab={currentTab} index={1}>
          {league && <History league={league} />}
        </TabPanel>
        <TabPanel currentTab={currentTab} index={2}>
          {league && <Details league={league} onAction={handleAction}/>}
        </TabPanel>
      </section>
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => handleNewMatch(user!.id)}
      >
        <Add />
      </Fab>
      {
        currentMatch && league &&
        <MatchEditor
          open={matchEditorOpen}
          onClose={handleMatchEditorClose}
          match={currentMatch}
          league={league}
        />
      }
    </div>
  );
};

export default LeagueComponent;
