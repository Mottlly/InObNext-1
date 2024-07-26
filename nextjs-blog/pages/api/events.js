import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { currentevent } = req.query;

  if (!currentevent) {
    return res.status(400).json({ message: "Event number is required" });
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    const database = client.db("InObscurum");
    const collection = database.collection("InOb");

    const event = await collection.findOne({
      event_number: parseInt(currentevent, 10),
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  } finally {
    await client.close();
  }
}
