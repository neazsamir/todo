import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import homepageController from '../controllers/homepage.controller.js'
import addTodoController from '../controllers/addTodo.controller.js'
import getTodoController from '../controllers/getTask.controller.js'
import deleteTodoController from '../controllers/deleteTodo.controller.js'
import updateTodoController from '../controllers/updateTodo.controller.js'


const router = Router()

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

router.get("/", homepageController)
router.post("/tasks", addTodoController)
router.get("/tasks", getTodoController)
router.delete("/tasks/:id", deleteTodoController)
router.patch("/tasks/:id", updateTodoController)

// Catch-all route for 404
router.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/404.html"))
})

export default router