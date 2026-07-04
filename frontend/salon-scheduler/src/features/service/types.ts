export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    isActive: boolean;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  duration: number;
  price: number;
  isActive: boolean;
}