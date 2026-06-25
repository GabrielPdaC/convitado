import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const CONFIG_ID = "config";

const DEFAULT_SETTINGS = {
  giftControlEnabled: false,
};

interface SettingsDoc {
  _id: string;
  giftControlEnabled: boolean;
}

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db.collection<SettingsDoc>("settings").findOne({ _id: CONFIG_ID });

    return NextResponse.json({
      giftControlEnabled: doc?.giftControlEnabled ?? DEFAULT_SETTINGS.giftControlEnabled,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { giftControlEnabled } = body;

    if (typeof giftControlEnabled !== "boolean") {
      return NextResponse.json({ error: "giftControlEnabled inválido" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection<SettingsDoc>("settings").updateOne(
      { _id: CONFIG_ID },
      { $set: { giftControlEnabled } },
      { upsert: true }
    );

    return NextResponse.json({ giftControlEnabled });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
