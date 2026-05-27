import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
    }

    const db = await getDb();
    const objectId = new ObjectId(id);

    const gift = await db.collection("gifts").findOne({ _id: objectId });

    if (!gift) {
      return NextResponse.json({ error: "Presente não encontrado" }, { status: 404 });
    }

    if (gift.reserved) {
      return NextResponse.json({ error: "Presente já reservado" }, { status: 409 });
    }

    await db.collection("gifts").updateOne(
      { _id: objectId },
      {
        $set: {
          reserved: true,
          reserved_by: name,
          reserved_at: new Date().toISOString(),
        },
      }
    );

    const updated = await db.collection("gifts").findOne({ _id: objectId });

    return NextResponse.json({ ...updated, id: updated!._id.toString(), _id: undefined });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
