import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Basic email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Insert email (ignore duplicates)
    await sql`
      insert into waitlist (email) values (${email.toLowerCase()})
      on conflict (email) do nothing;
    `;

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
