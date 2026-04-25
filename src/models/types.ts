export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  password?: string;
};

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};
