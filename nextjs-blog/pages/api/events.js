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

    // Convert the current event number to an integer
    const currentEventNumber = parseInt(currentevent, 10);

    // Fetch the current event
    const currentEvent = await collection.findOne({
      event_number: currentEventNumber,
    });

    if (!currentEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Initialize next events array
    const nextEvents = [];
    nextEvents.push(currentEvent);

    // Check if nextswipe exists and fetch next events accordingly
    if (currentEvent.nextswipe) {
      const rightEventPromise = collection.findOne({
        event_number: currentEvent.nextswipe.right,
      });

      const leftEventPromise = collection.findOne({
        event_number: currentEvent.nextswipe.left,
      });

      const [rightEvent, leftEvent] = await Promise.all([
        rightEventPromise,
        leftEventPromise,
      ]);

      // Add only the valid next events
      if (rightEvent) nextEvents.push(rightEvent);
      if (leftEvent) nextEvents.push(leftEvent);
    }

    res.status(200).json(nextEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  } finally {
    await client.close();
  }
}
