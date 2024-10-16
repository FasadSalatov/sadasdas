export interface IUser {
  name: string;
  balance_coin: number;
  photo_url: string;
  promo_active: boolean;
  wallet: string | null;
}

export interface IRefferalUser {
  name: string;
  user_id: string;
  photo_url: string;
  is_claim: boolean;
  claim_coin: number;
  username: string;
}

export interface ITask {
  id: number;
}

export interface ITaskError {
  id: number;
  isError: boolean;
}

interface TRef {
  name: string;
  photo: string;
  id: string;
  username: string;
}
export interface TPriveRefferal {
  name: string;
  photo: string;
  id: string;
  username: string;
  friend: TRef[];
}
