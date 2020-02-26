export interface League {
  id?: string;
  displayName: string;
  description?: string;
  pictureURL?: string;
  userCount?: number;
  users?: Record<string, LeagueUser>
};

export interface LeagueUser {
  id: string
  score: number
  displayName: string
  pictureURL: string
  role: string
  isActive: boolean
}

export interface NewLeague {
  displayName: string
  description: string
  pictureURL: string
}
