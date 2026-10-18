export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  count: number;
}

export type ProductValues = Omit<Product, "id">;

export const ProductModel = {
  name: "",
  img: "",
  price: undefined,
  count: undefined,
};
