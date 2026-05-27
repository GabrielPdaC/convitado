import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const data = await db
      .collection("confirmations")
      .find({})
      .sort({ created_at: -1 })
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, guests, message } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
    }

    const db = await getDb();
    const doc = {
      _id: new ObjectId(),
      name,
      guests: Number(guests) || 0,
      message: message || null,
      created_at: new Date().toISOString(),
    };

    await db.collection("confirmations").insertOne(doc);

    return NextResponse.json({ ...doc, id: doc._id.toString(), _id: undefined }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
