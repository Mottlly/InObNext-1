import nodemailer from "nodemailer";
import crypto from "crypto";
import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method Not Allowed", allowedMethods: ["POST"] });
  }

  const { email } = req.body;

  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db("InObscurum");
    const usersCollection = database.collection("Users");

    // Check if the email exists in your collection
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString("hex");

    // Set token expiry time (1 hour from now)
    const tokenExpiry = Date.now() + 3600000; // 1 hour in milliseconds

    // Update the user document with reset token and expiry
    await usersCollection.updateOne(
      { email },
      { $set: { resetPasswordToken: token, resetPasswordExpires: tokenExpiry } }
    );

    // Send an email with the reset link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "inobscurumgame@gmail.com",
        pass: "rzxytysomhbcdtsn",
      },
    });

    const mailOptions = {
      from: "inobscurumgame@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text:
        `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `${req.headers.host}/reset-password?token=${token}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to send email" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}
