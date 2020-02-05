export interface AuthenticationHeader {
  Authorization: string;
}

export interface AuthToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  expires: Date;
}
