import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price_range, store_link } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
    }

    const db = await getDb();
    const doc = {
      _id: new ObjectId(),
      name: name.trim(),
      description: description?.trim() || null,
      price_range: price_range?.trim() || null,
      store_link: store_link?.trim() || null,
      reserved: false,
      reserved_by: null,
      reserved_at: null,
      created_at: new Date().toISOString(),
    };

    await db.collection("gifts").insertOne(doc);

    return NextResponse.json({ ...doc, id: doc._id.toString(), _id: undefined }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
