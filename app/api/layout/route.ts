import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "layout.json");

export async function GET() {
  try {
    const txt = await fs.readFile(FILE, "utf8");
    return NextResponse.json(JSON.parse(txt));
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "payload inválido" }, { status: 400 });
    }
    await fs.writeFile(FILE, JSON.stringify(body, null, 2) + "\n", "utf8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
