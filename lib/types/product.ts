import { Profile } from "./profile";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory[];
  description: string;
  stack: ProductStack[];
  hosting: ProductHosting[];
  demoUrl: string | null;
  updatesIncluded: boolean;
  setupIncluded: boolean;
  price: number;
  sales: number;
  seller: Profile;
  createdAt: string;
  screenshots: Screenshot[];
};

export type Screenshot = {
  id: string;
  url: string;
  position: number;
};

export type ProductCategory = {
  id: string;
  name?: string;
};

export type ProductStack = {
  id: string;
  name?: string;
};

export type ProductHosting = {
  id: string;
  name?: string;
};

export interface ProductFilters {
  search: string;
  categories: string[];
  stacks: string[];
  hostings: string[];
}
