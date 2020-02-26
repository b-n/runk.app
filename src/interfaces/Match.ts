export interface Match {
  id?: string
  leagueId?: string
  date: Date
  users: Record<string, MatchUser>
  winner?: MatchTeam
}

export interface MatchUser {
  id: string
  team: MatchTeam
  previousElo?: number
  elo?: number
}

type MatchTeam = number
