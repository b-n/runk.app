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
import { useUser } from '../../stores/user';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
  },
});

const evaluateIsMember = (league: League, user: User): boolean =>
  league.users![user.id] && league.users![user.id].isActive;

const LeagueComponent: React.FC = () => {
  const classes = useStyles();
  const { getById, join, leave } = useLeagueService();

  const { id } = useParams();
  const { authenticationHeader } = useAuth();
  const { user } = useUser();

  const [league, setLeague] = useState<League>();
  const [currentTab, setCurrentTab] = useState(2);
  const [currentMatch, setCurrentMatch] = useState<Match>();
  const [matchEditorOpen, setMatchEditorOpen] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const getLeagueData = React.useCallback((setTab: boolean) => {
    return getById(authenticationHeader!, id!)
      .then(result => {
        setLeague(result);
        if (setTab) {
          const isMember = evaluateIsMember(result, user!);
          setIsMember(isMember);
          setCurrentTab(isMember ? 0 : 2);
        }
      });
  }, [getById, authenticationHeader, id, user]);

  useEffect(() => {
    if (id && authenticationHeader && user) {
      getLeagueData(true);
    }
  }, [id, authenticationHeader, getLeagueData, user]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleAction = async () => {
    const action = isMember ? leave : join;
    action(id!)
      .then(() => getLeagueData(true));
  };

  const handleMatchEditorClose = () => {
    setCurrentMatch(undefined);
    setMatchEditorOpen(false);
    getLeagueData(false);
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
            <Tab label="Runking" id="0" key="0" />
            <Tab label="History" id="1" key="1" />
            <Tab label="Details" id="2" key="2" />
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
          {league && <Details league={league} isMember={isMember} onAction={handleAction}/>}
        </TabPanel>
      </section>
      {
        isMember && currentTab !== 2 &&
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
