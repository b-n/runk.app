interface User {
  name: string;
};

interface Auth {
  isAuthed: boolean;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
};

interface League {
  id?: string;
  name: string;
  description?: string;
  players_amount?: number;
  image_url?: string;
  invite_code?: string;
};
