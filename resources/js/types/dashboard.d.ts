export interface Category {
  id: number;
  name_en: string;
  name_ar: string;
  name_ru: string;
  created_at: string;
  updated_at: string;
  regions: Region[];
}

export interface Product {
  id: number;
  title_en: string;
  title_ar: string;
  title_ru: string;
  description_en: string;
  description_ar: string;
  description_ru: string;
  image: string;
  category_id: number;
  region_id?: number;
  price: number;
  seen: number;
  sales_count: number;
  status: number | boolean;
  created_at: string;
  value: string;
  updated_at: string;
  category_name: string;
  slug: string;
  fields: Field[];
  orders_count?: number;
  orders_sum_quantity?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  phone: string;
  status: number | boolean;
  is_admin: number | boolean;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface Code {
  id: number;
  code: string;
  product_title: string;
  product_id: string;
  expired: string;
  created_at: string;
  updated_at: string;
}

export interface Field {
  id: number;
  key: string;
  title_en: string;
  title_ar: string;
  title_ru: string;
  type: string;
  product_title: string;
  options?: string;
  product_id: number | string;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: number;
  subject: string;
  category: string;
  message: string;
  status: number | boolean;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface Message {
  id: number;
  message: string;
  sender_id: number;
  ticket_id: number;
  created_at: string;
  updated_at: string;
  attachment?: Attachment;
  admin: boolean;
}

export interface Attachment {
  id: number;
  file_path: string;
  message_id: number;
  created_at: string;
  updated_at: string;
}

export interface Currency {
  id: number;
  currency_name: string;
  usd_value: number;
  created_at: string;
  updated_at: string;
}

export interface Region {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
  products: Product[];
}

export interface WalletHistory {
  id: number;
  user_id: number;
  amount: string;
  payment_method: string;
  screenshot: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user_email?: string;
  user?: User;
  fields?: { [key: string]: string };
}
