//export default function handler(req, res) {
//res.status(200).json({ message: "Hello from Next.js!" });
//}

// pages/api/login.js

// TODO consider combining login and signup //

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  console.log(process.env.MONGODB_URI);
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    // Choose a name for your database
    const database = client.db("InObscurum");

    // Choose a name for your collection
    const collection = database.collection("Users");

    const user = await collection.findOne({ email: email });

    if (user) {
      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({ message: "Authorized" });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    res.status(500).json({ message: "Something went wrong!" });
  } finally {
    await client.close();
  }
}
