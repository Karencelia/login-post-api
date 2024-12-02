import { query } from "../lib/db";
import { comparePassword, generateToken } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  try {
    const result = await query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in." });
  }
}
