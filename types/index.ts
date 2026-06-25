export interface Confirmation {
  id: string;
  name: string;
  guests: number;
  message?: string;
  created_at: string;
}

export interface Settings {
  giftControlEnabled: boolean;
}

export interface Gift {
  id: string;
  name: string;
  description?: string;
  price_range?: string;
  store_link?: string;
  reserved: boolean;
  reserved_by?: string;
  reserved_at?: string;
  created_at: string;
}
