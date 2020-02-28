import React, { useEffect, useState } from 'react';

import { calculateNewRatings, EloOutcome } from '../../../lib/elo';

interface OutcomesProps {
  className?: string;
  elo1: number;
  elo2: number;
  outcome: EloOutcome;
}

interface ValueProps {
  value: number;
  highlighted?: boolean;
}

const Left = ({ value, highlighted }: ValueProps) => (
  <td style={{ textAlign: 'right', backgroundColor: `${highlighted ? '#f6f6f6' : 'transparent'}` }}>
    {value.toFixed(2)}
  </td>
);
const Middle: React.FC = ({ children }) => (
  <td style={{ textAlign: 'center' }}>{children}</td>
);
const Right = ({ value, highlighted }: ValueProps) => (
  <td style={{ textAlign: 'left', backgroundColor: `${highlighted ? '#f6f6f6' : 'transparent'}` }}>
    {value.toFixed(2)}
  </td>
);

const Outcomes: React.FC<OutcomesProps> = ({ className, elo1, elo2, outcome }) => {
  const [win, setWin] = useState<Array<number>>([0, 0]);
  const [draw, setDraw] = useState<Array<number>>([0, 0]);
  const [loss, setLoss] = useState<Array<number>>([0, 0]);

  useEffect(() => {
    setWin(calculateNewRatings(elo1, elo2, 1));
    setDraw(calculateNewRatings(elo1, elo2, 0.5));
    setLoss(calculateNewRatings(elo1, elo2, 0));
  }, [elo1, elo2]);

  return (
    <table className={className}>
      <tbody>
        <tr>
          <Left value={win[0] - elo1} highlighted={outcome === EloOutcome.CHALLENGER}/>
          <Middle>Win</Middle>
          <Right value={loss[1] - elo2} highlighted={outcome === EloOutcome.OPPONENT}/>
        </tr>
        <tr>
          <Left value={draw[0] - elo1} highlighted={outcome === EloOutcome.DRAW}/>
          <Middle>Draw</Middle>
          <Right value={draw[1] - elo2} highlighted={outcome === EloOutcome.DRAW}/>
        </tr>
        <tr>
          <Left value={loss[0] - elo1} highlighted={outcome === EloOutcome.OPPONENT}/>
          <Middle>Loss</Middle>
          <Right value={win[1] - elo2} highlighted={outcome === EloOutcome.CHALLENGER}/>
        </tr>
      </tbody>
    </table>
  );
};

export default React.memo(Outcomes);
