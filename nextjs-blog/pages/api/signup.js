import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    const database = client.db("InObscurum");
    const collection = database.collection("Users");

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new user document
    const newUser = {
      email: email,
      password: password,
    };

    // Insert the new user into the database
    const result = await collection.insertOne(newUser);

    if (result.insertedCount === 1) {
      res.status(201).json({ message: "User created successfully" });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Something went wrong!" });
  } finally {
    await client.close();
  }
}
