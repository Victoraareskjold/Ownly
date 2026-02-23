import { NextRequest, NextResponse } from "next/server";
import { LoopsClient } from "loops";

if (!process.env.LOOPS_API_KEY) {
  throw new Error("Missing LOOPS_API_KEY");
}

const loops = new LoopsClient(process.env.LOOPS_API_KEY);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const resp = await loops.updateContact({
    email,
  });

  return NextResponse.json({ success: resp.success });
}
