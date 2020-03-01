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
import { User } from '../../interfaces/User';
import { useLeagueService } from '../../services/leagues';
import { useAuth } from '../../stores/auth';
import { useUser, useUserMutations } from '../../stores/user';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
  },
});

const evaluateIsMember = (league: League, user: User): boolean =>
  !!(user.leagues[league.id!] && league.users![user.id]);

const LeagueComponent: React.FC = () => {
  const classes = useStyles();
  const { getById } = useLeagueService();

  const { id } = useParams();
  const { authenticationHeader } = useAuth();
  const { user } = useUser();
  const { loadUser } = useUserMutations();

  const [league, setLeague] = useState<League>();
  const [currentTab, setCurrentTab] = useState(2);
  const [currentMatch, setCurrentMatch] = useState<Match>();
  const [matchEditorOpen, setMatchEditorOpen] = useState(false);
  const [isMyLeague, setIsMyLeague] = useState(false);

  useEffect(() => {
    if (id && authenticationHeader && user) {
      getById(authenticationHeader!, id)
        .then(result => {
          const isMember = evaluateIsMember(result, user!);
          setIsMyLeague(isMember);
          setCurrentTab(isMember ? 0 : 2);
          setLeague(result);
        });
    }
  }, [id, authenticationHeader, getById, user]);

  useEffect(() => {
    if (!user || !league) {
      return;
    }
    const isMember = evaluateIsMember(league, user);
    setIsMyLeague(isMember);
    setCurrentTab(isMember ? 0 : 2);
  }, [user, league]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAction = async () => {
    getById(authenticationHeader!, id!)
      .then(result => setLeague(result))
      .then(() => loadUser());
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
    <>
      <section>
        <Title variant={'subtitle'}>
          {
            league
              ? league.displayName
              : 'League'
          }
        </Title>
        <AppBar position="static">
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Runking" id="0" key="0" disabled={!isMyLeague}/>
            <Tab label="History" id="1" key="1" disabled={!isMyLeague}/>
            <Tab label="Details" id="2" key="2"/>
          </Tabs>
        </AppBar>
      </section>
      <section className="content">
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
      {
        currentTab !== 2 &&
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => handleNewMatch(user!.id)}
        >
          <Add />
        </Fab>
      }
      {
        currentMatch && league &&
        <MatchEditor
          open={matchEditorOpen}
          onClose={handleMatchEditorClose}
          match={currentMatch}
          league={league}
        />
      }
    </>
  );
};

export default LeagueComponent;
