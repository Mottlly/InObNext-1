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

    // Fetch the next two events based on `nextswipe`
    const nextEvents = await Promise.all([
      collection.findOne({
        event_number: currentEventNumber + currentEvent.nextswipe.right,
      }),
      collection.findOne({
        event_number: currentEventNumber + currentEvent.nextswipe.left,
      }),
    ]);

    // Filter out any null values (in case the next events don't exist)
    const validNextEvents = nextEvents.filter((event) => event !== null);

    // Combine current event with the valid next events
    const responseEvents = [currentEvent, ...validNextEvents];

    res.status(200).json(responseEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  } finally {
    await client.close();
  }
}
