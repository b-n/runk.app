import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import formatDistance from 'date-fns/formatDistance';

import { useMatchService } from '../../../services/match';
import { League } from '../../../interfaces/League';
import { Match, MatchUser } from '../../../interfaces/Match';

import { useAuth } from '../../../stores';

const useStyles = makeStyles({
  match: {
    margin: 8,
  },
  avatars: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: '15%',
    marginRight: '15%',
    alignItems: 'center',
    marginBottom: 1,
  },
  image: {
    width: '45px',
    height: '45px',
  },
  outcome: {
    textAlign: 'center',
  },
  winner: {
    position: 'relative',
    '&:after': {
      position: 'absolute',
      content: '',
      display: 'block',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: 'rgba(255,255,255, .5)',
    },
  },
  when: {
    textAlign: 'center',
  },
});

interface HistoryProps {
  league: League;
}

const History: React.FC<HistoryProps> = ({ league }) => {
  const classes = useStyles();
  const { authenticationHeader } = useAuth();
  const { getMatchesByLeague } = useMatchService();
  const [matches, setMatches] = useState<Array<Match>>([]);

  useEffect(() => {
    if (!league.id) {
      return;
    }
    getMatchesByLeague(authenticationHeader!, league.id)
      .then(matches => {
        matches.sort((a, b) => b.date.getTime() - a.date.getTime());
        setMatches(matches);
      });
  }, [league.id, getMatchesByLeague, authenticationHeader]);

  return (
    <div>
      {
        matches.map(match => {
          const users = Object.keys(match.users).reduce((a, c) => {
            const user = { id: c, ...match.users[c] };
            a[user.team] = user;
            return a;
          }, [] as Array<MatchUser>);

          const winnerId = match.winner === 0 ? 'DRAW' : users[match.winner!].id;

          return (
            <Card className={classes.match} key={match.id}>
              <CardContent>
                <div className={classes.avatars}>
                  <Avatar
                    src= {league.users![users[1].id].pictureURL}
                    className={classes.image}
                  />
                  <Typography variant="h5">vs</Typography>
                  <Avatar
                    src= {league.users![users[2].id].pictureURL}
                    className={classes.image}
                  />
                </div>
                <Typography className={classes.outcome}>
                  {winnerId === 'DRAW' ? 'Draw' : league.users![winnerId].displayName + ' wins'}
                </Typography>
                <Typography variant="body2" className={classes.when}>
                  {formatDistance(match.date, new Date())} ago
                </Typography>
              </CardContent>
            </Card>
          );
        })
      }
    </div>
  );
};

export default React.memo(History);
