import { getTask } from '../models/getTasks.model.js'
import { saveTask } from '../models/saveTask.model.js'
import crypto from 'crypto'
import taskSchema from '../schemas/safetask.schema.js'

const addTodoController = async (req, res) => {
  try {
    const { task, alarm } = req.body
    const formattedAlarm = new Date(alarm).getTime()
    // Validate the task using Zod
    const validation = taskSchema.safeParse(task)
    if (!validation.success) {
  		const messages = validation.error.errors.map(err => err.message).join(", ");
		  return res.status(400).json({ success: false, message: messages });
		}
		
		if (isNaN(formattedAlarm)) {
			return res.status(400).json({ success: false, message: "Invalid alarm date" });
		}
		
    const tasks = (await getTask()) || []
    const id = crypto.randomBytes(3).toString('hex')
    const newTask = { id, task: task.trim(), done: false, alarm }
    tasks.unshift(newTask)
    await saveTask(JSON.stringify(tasks, null, 2))
    
    return res.status(200).json({ success: true, task: newTask, message: 'Task added' })
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to save." })
    console.log("Error adding todo: ", e)
  }
}

export default addTodoController;