export interface League {
  id?: string;
  name: string;
  description?: string;
  image_url?: string;
  players_amount?: number;
};

export interface NewLeague {
  name: string
  description: string
  image_url: string
}
