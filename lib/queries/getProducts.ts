import { createClient } from "@/lib/supabase/server";
import { mapProductFromDb } from "@/lib/mappers/productMapper";
import { Product } from "@/lib/types/product";

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      tagline,
      description,
      price,
      sales,
      updates_included,
      setup_included,
      created_at,
      demo_url,
      profiles (id, name, seller_approved)
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return mapProductFromDb(data);
}

interface GetProductsParams {
  search?: string;
  categories?: string[];
  stacks?: string[];
  hostings?: string[];
  limit?: number;
  offset?: number;
  sellerId?: string;
  onlyApproved?: boolean;
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<Product[]> {
  const supabase = await createClient();
  const {
    search,
    categories,
    stacks,
    hostings,
    limit = 20,
    offset = 0,
    sellerId,
    onlyApproved = true,
  } = params;

  let query = supabase.from("products").select(`
      id,
      name,
      tagline,
      description,
      price,
      sales,
      updates_included,
      setup_included,
      created_at,
      profiles!inner(id, name, seller_approved)
    `);

  if (search) query = query.ilike("name", `%${search}%`);
  if (categories?.length) query = query.in("category", categories);
  if (stacks?.length) query = query.in("stack", stacks);
  if (hostings?.length) query = query.in("hosting", hostings);
  if (sellerId?.length) query = query.eq("seller_id", sellerId);
  if (onlyApproved) query = query.eq("profiles.seller_approved", true);

  query = query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map(mapProductFromDb);
}

export async function getLatestProducts(limit = 20, onlyApproved = true) {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(
      `id,
      name,
      tagline,
      description,
      price,
      sales,
      updates_included,
      setup_included,
      created_at,
      profiles!inner(
        id,
        name,
        seller_approved
      ),
      product_to_categories(
        product_categories(id, name)
      ),
      product_to_stacks(
        product_stacks(id, name)
      ),
      product_to_hostings(
        product_hostings(id, name)
      )`,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (onlyApproved) query = query.eq("profiles.seller_approved", true);

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map(mapProductFromDb);
}
