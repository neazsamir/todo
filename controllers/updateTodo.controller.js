import { getTask } from '../models/getTasks.model.js'
import { saveTask } from '../models/saveTask.model.js'

const updateTask = async (req, res) => {
	try {
		const tasks = await getTask() || []

		const task = tasks.find(task => task.id === req.params.id)
		if (!task) {
			return res.status(404).json({ success: false, message: 'Task not found' })
		}

		if (req.body.update === 'status') {
			task.done = !task.done
			await saveTask(JSON.stringify(tasks, null, 2))
			return res.status(200).json({ success: true, message: 'Task updated' })
		}

		// If 'update' field is not recognized
		return res.status(400).json({ success: false, message: 'Unacceptable request' })
	} catch (err) {
		console.error('update status error:', err);
		res.status(500).json({ success: false, message: 'Server error' })
	}
}



export default updateTask;