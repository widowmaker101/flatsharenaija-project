const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }
})

// Get all messages
app.get("/messages", async (req, res) => {
  const result = await pool.query("SELECT * FROM public.messages ORDER BY created_at ASC")
  res.json(result.rows)
})

// Post a new message
app.post("/messages", async (req, res) => {
  const { sender, text, avatar } = req.body
  const result = await pool.query(
    "INSERT INTO public.messages (sender, text, avatar) VALUES ($1, $2, $3) RETURNING *",
    [sender, text, avatar]
  )
  const newMsg = result.rows[0]
  // Broadcast to all connected clients
  io.emit("newMessage", newMsg)
  res.json(newMsg)
})

io.on("connection", (socket) => {
  console.log("A user connected")
  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`Backend running with Socket.IO on port ${PORT}`))
