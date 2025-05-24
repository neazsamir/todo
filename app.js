import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './routes/todo.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware to parse incoming data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')))

// Use your API routes
app.use(router)

// Default route (optional, serves index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🔥 Listening on PORT ${PORT}`))