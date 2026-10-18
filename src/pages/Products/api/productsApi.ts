import type { Product, ProductValues } from "../AddProduct/Models/ProductModel";
import apiRequests from "@/services/configs/axios";
import { endpoints } from "@/services/shared/endpoints";

type ProductResponse = Omit<Product, "price" | "count"> & {
  price: number | string;
  count: number | string;
};

function normalizeProduct(product: ProductResponse): Product {
  const price = Number(product.price);
  const count = Number(product.count);

  if (!Number.isFinite(price) || !Number.isFinite(count)) {
    throw new Error("قیمت یا موجودی محصول معتبر نیست.");
  }

  return { ...product, price, count };
}

export const productsApi = {
  async list(): Promise<Product[]> {
    const { data } = await apiRequests.get<ProductResponse[]>(endpoints.products);
    return data.map(normalizeProduct);
  },
  async remove(id: number): Promise<number> {
    await apiRequests.delete(`${endpoints.products}/${id}`);
    return id;
  },
  async create(values: ProductValues): Promise<Product> {
    const { data } = await apiRequests.post<ProductResponse>(endpoints.products, values);
    return normalizeProduct(data);
  },
  async update(id: number, changes: ProductValues): Promise<Product> {
    const { data } = await apiRequests.patch<ProductResponse>(`${endpoints.products}/${id}`, changes);
    return normalizeProduct(data);
  },
};
