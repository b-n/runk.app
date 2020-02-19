export interface League {
  id?: string;
  name: string;
  description?: string;
  image_url?: string;
  players_amount?: number;
  players?: Array<LeagueUser>
};

export interface LeagueUser {
  id: string
  score: number
  name: string
  image_url: string
  role: string
}

export interface NewLeague {
  name: string
  description: string
  image_url: string
}
