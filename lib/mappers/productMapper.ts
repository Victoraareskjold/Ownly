/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/lib/types/product";

export function mapProductFromDb(data: any): Product {
  return {
    id: data.id,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    price: data.price,
    sales: data.sales,
    updatesIncluded: data.updates_included,
    setupIncluded: data.setup_included,
    demoUrl: data.demo_url,
    createdAt: data.created_at,
    seller: {
      id: data.profiles?.id,
      isTeam: data.profiles?.isTeam,
      name: data.profiles?.name,
      sellerApproved: data.profiles?.seller_approved,
      email: data.profiles?.email,
      role: data.profiles?.role,
      stripeAccountId: data.profiles?.stripe_account_id,
      createdAt: data.profiles?.created_at,
    },
    category: (data.product_to_categories ?? []).map((r: any) => ({
      id: r.product_categories.id,
      name: r.product_categories.name,
    })),
    stack: (data.product_to_stacks ?? []).map((r: any) => ({
      id: r.product_stacks.id,
      name: r.product_stacks.name,
    })),
    hosting: (data.product_to_hostings ?? []).map((r: any) => ({
      id: r.product_hostings.id,
      name: r.product_hostings.name,
    })),
  };
}
