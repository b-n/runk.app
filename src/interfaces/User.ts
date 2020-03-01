export interface User {
  name: string;
  img?: string;
  id: string;
  leagues: Record<string, UserLeague>;
};

export interface UserLeague {
  id: string;
  displayName: string;
  description: string;
  pictureURL: string;
}
