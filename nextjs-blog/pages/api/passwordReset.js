const express = require("express");
const router = express.Router();
const crypto = require("crypto");
import bcrypt from "bcrypt";
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB connection URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Endpoint to handle password reset
router.post("/passwordReset", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db("InObscurum"); // Replace with your database name
    const usersCollection = database.collection("Users"); // Replace with your collection name

    // Find user by reset token and check token expiry
    const user = await usersCollection.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Token is invalid or expired" });
    }

    // Generate new hashed password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Replace with your hashing method (e.g., bcrypt)

    // Update user's password and clear reset token fields
    await usersCollection.updateOne(
      { _id: ObjectId(user._id) },
      {
        $set: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      }
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

module.exports = router;
