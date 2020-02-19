import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { useParams } from 'react-router-dom'

import TabPanel from '../../components/TabPanel'
import Title from '../../components/Title'
import Runking from './Runking'
import Details from './Details'
import History from './History'

import { League } from '../../interfaces/League'
import { useLeagueService } from '../../services/leagues'
import { useAuth } from '../../stores/auth'

const LeagueComponent: React.FC = () => {
  const { id } = useParams();
  const { isAuthed } = useAuth();
  const LeagueService = useLeagueService();
  const [ currentTab, setCurrentTab ] = useState(0);
  const [ league, setLeague ] = useState({} as League);

  useEffect(() => {
    if (!id || !isAuthed) {
      return
    }
    LeagueService.getById(id)
      .then(result => setLeague(result))
  }, [id, isAuthed])

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <div>
      <Title>
        {
          league
          ? league.name
          : 'League'
        }
      </Title>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab label="Runking" id="0"/>
          <Tab label="History" id="1"/>
          <Tab label="Details" id="2"/>
        </Tabs>
      </AppBar>
      <TabPanel currentTab={currentTab} index={0}>
        {league && <Runking league={league} />}
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        {league && <History league={league} />}
      </TabPanel>
      <TabPanel currentTab={currentTab} index={2}>
        {league && <Details league={league} />}
      </TabPanel>
    </div>
  )
}

export default LeagueComponent
