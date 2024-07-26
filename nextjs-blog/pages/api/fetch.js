import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  const { currentEvent } = req.query;

  if (!currentEvent) {
    return res.status(400).json({ error: "Event not specified" });
  }

  try {
    await client.connect();
    const db = client.db("InObscurum");
    const collection = db.collection("InOb");

    // Fetch event data
    const event = await collection.findOne({ id: currentEvent });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Return event data
    return res.status(200).json(event);
  } catch (error) {
    console.error("Failed to fetch event data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
