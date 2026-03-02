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
      profiles (id, name)
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
      profiles (id, name)
    `);

  if (search) query = query.ilike("name", `%${search}%`);
  if (categories?.length) query = query.in("category", categories);
  if (stacks?.length) query = query.in("stack", stacks);
  if (hostings?.length) query = query.in("hosting", hostings);

  query = query
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map(mapProductFromDb);
}

export async function getLatestProducts(limit = 20) {
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
      profiles (
        id,
        name
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map(mapProductFromDb);
}
