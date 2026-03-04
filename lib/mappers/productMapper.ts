import { Product } from "@/lib/types/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProductFromDb(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    price: row.price,
    sales: row.sales,
    updatesIncluded: row.updates_included,
    setupIncluded: row.setup_included,
    createdAt: row.created_at,
    category: [],
    stack: [],
    hosting: [],
    seller: {
      id: row.profiles?.id,
      name: row.profiles?.name,
      sellerApproved: row.profiles?.seller_approved,
    },
  };
}
