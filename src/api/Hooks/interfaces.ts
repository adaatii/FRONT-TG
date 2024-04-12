export interface employee {
  id?: number;
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
}

export interface category {
  id?: number;
  description?: string;
}

export interface product {
  id?: number;
  description?: string;
  price?: number;
  category_id?: number;
}
