import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB ?? "convitado";

const gifts = [
  { name: "Kit de Maquiagem", description: "Paleta de sombras e batons", price_range: "R$ 80 – R$ 150", reserved: false },
  { name: "Perfume Feminino", description: "Fragrância floral delicada", price_range: "R$ 120 – R$ 200", reserved: false },
  { name: "Bolsa", description: "Bolsa feminina elegante", price_range: "R$ 150 – R$ 300", reserved: false },
  { name: "Jogo de Cama Queen", description: "200 fios ou mais", price_range: "R$ 200 – R$ 400", reserved: false },
  { name: "Vale-presente Renner", description: "", price_range: "R$ 100", reserved: false },
  { name: "Vale-presente Shein", description: "", price_range: "R$ 100", reserved: false },
  { name: "Fritadeira Air Fryer", description: "Para a casa nova", price_range: "R$ 250 – R$ 400", reserved: false },
  { name: "Fone de Ouvido Bluetooth", description: "", price_range: "R$ 100 – R$ 200", reserved: false },
  { name: "Câmera Instantânea Instax", description: "", price_range: "R$ 300 – R$ 500", reserved: false },
  { name: "Conjunto de Skincare", description: "Hidratante, tônico e sérum", price_range: "R$ 100 – R$ 180", reserved: false },
];

async function seed() {
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("gifts");

  const existing = await collection.countDocuments();
  if (existing > 0) {
    console.log(`Coleção "gifts" já tem ${existing} itens — seed ignorado.`);
    await client.close();
    return;
  }

  const docs = gifts.map((g) => ({ ...g, created_at: new Date().toISOString() }));
  await collection.insertMany(docs);

  console.log(`✓ ${docs.length} presentes inseridos no banco "${dbName}"`);
  await client.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
