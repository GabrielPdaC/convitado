import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const data = await db
      .collection("gifts")
      .find({})
      .sort({ created_at: 1 })
      .toArray();

    const serialized = data.map((d) => ({
      ...d,
      id: d._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json(serialized);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
