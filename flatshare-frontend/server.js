import express from "express"
import cors from "cors"
import { Pool } from "pg"
import { Server } from "socket.io"
import http from "http"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Create Express + HTTP server
const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

// Middleware
app.use(cors())
app.use(express.json())

// Postgres connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://flatsharenaija_db_user:oqDAN7mPBeL7M6a0FQTaYry697rVEjF0@dpg-d4opvvbe5dus73cf08a0-a.frankfurt-postgres.render.com/flatsharenaija_db",
  ssl: { rejectUnauthorized: false }
})

// JWT secret (use env var in production)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"

// ---------------- AUTH ROUTES ----------------

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashed])
    res.json({ message: "User created" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Signup failed" })
  }
})

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username])
    if (result.rows.length === 0) return res.status(401).json({ error: "Invalid credentials" })

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: "Invalid credentials" })

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" })
    res.json({ token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Login failed" })
  }
})

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: "No token" })
  const token = authHeader.split(" ")[1]
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: "Invalid token" })
  }
}

// ---------------- CHAT ROUTES ----------------

// Fetch messages
app.get("/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.messages ORDER BY created_at ASC")
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch messages" })
  }
})

// Post message (protected)
app.post("/messages", authMiddleware, async (req, res) => {
  try {
    const { text, avatar } = req.body
    const sender = req.user.username // from JWT
    const result = await pool.query(
      "INSERT INTO public.messages (sender, text, avatar, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [sender, text, avatar]
    )
    const newMsg = result.rows[0]
    io.emit("newMessage", newMsg)
    res.json(newMsg)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to save message" })
  }
})

// ---------------- SOCKET.IO ----------------
io.on("connection", socket => {
  console.log("A user connected")

  socket.on("typing", user => {
    io.emit("userTyping", user)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

// ---------------- SERVER START ----------------
const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Backend running with Socket.IO + JWT on port ${PORT}`)
})
