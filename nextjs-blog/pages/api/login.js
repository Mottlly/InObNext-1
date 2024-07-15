//export default function handler(req, res) {
//res.status(200).json({ message: "Hello from Next.js!" });
//}

// pages/api/login.js

// Example endpoint to handle login
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Perform authentication logic here (e.g., check credentials, generate tokens, etc.)
  const { email, password } = req.body;

  // Example: Check if email and password match (replace with your actual authentication logic)
  if (email === "user@example.com" && password === "password") {
    // Mock user data
    const user = {
      id: 1,
      username: "user",
      email: "user@example.com",
    };

    // Ideally, generate a JWT token here and send it back in response
    return res.status(200).json({ user });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
