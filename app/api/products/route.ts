import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/queries/getProducts";

export async function GET(req: NextRequest) {
  const { search, categories, stacks, hostings, limit, offset } =
    Object.fromEntries(req.nextUrl.searchParams);

  const products = await getProducts({
    search: search as string | undefined,
    categories: categories ? (categories as string).split(",") : undefined,
    stacks: stacks ? (stacks as string).split(",") : undefined,
    hostings: hostings ? (hostings as string).split(",") : undefined,
    limit: limit ? parseInt(limit as string, 10) : 20,
    offset: offset ? parseInt(offset as string, 10) : 0,
  });

  return NextResponse.json(products);
}
