export interface Hizmet {
  id: number;
  ad: string;
  fiyat: number;
}
export interface ServiceCategory {
  id: number;
  name: string;
}
export interface Service {
  id: number;
  name: string;
  company_id: number;
  price: number;
  category_id: number;
  company_name: string;
}

export interface Company {
  id: number;
  company_name: string;
  address: string;
  phone: string;
}