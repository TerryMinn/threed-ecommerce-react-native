import { ProductI } from "@/types/product.type";
import { apiClient } from "./api-client";

const getAllProducts = (): Promise<{ data: ProductI[] }> =>
  apiClient.get<ProductI[]>("/products");

const getProduct = (id: string): Promise<{ data: ProductI }> =>
  apiClient.get<ProductI>(`/products/${id}`);

export { getAllProducts, getProduct };
