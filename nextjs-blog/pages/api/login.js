//export default function handler(req, res) {
//res.status(200).json({ message: "Hello from Next.js!" });
//}

// pages/api/login.js

// TODO consider combining login and signup //

import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            password: user.password,
          },
          process.env.JWT_SECRET, // Use a secure secret key stored in environment variable
          {
            expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
          }
        );
        res.status(200).json({
          message: "Authorized",
          token: token,
          user: { id: user._id, email: user.email, progress: user.progress },
        });
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
