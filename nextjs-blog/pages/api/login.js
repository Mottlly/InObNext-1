//export default function handler(req, res) {
//res.status(200).json({ message: "Hello from Next.js!" });
//}

// pages/api/login.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (email === "user@example.com" && password === "password") {
    // Mock user data
    const user = {
      id: 1,
      username: "user",
      email: "user@example.com",
    };

    return res.status(200).json({ user });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
