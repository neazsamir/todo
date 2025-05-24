import { getTask } from '../models/getTasks.model.js';
import { saveTask } from '../models/saveTask.model.js';

const deleteTodo = async (req, res) => {
	try {
		const tasks = await getTask() || [];
		const deletedTask = tasks.find(item => item.id === req.params.id);

		if (!deletedTask) {
			return res.status(404).json({ success: false, message: 'Task not found' });
		}

		const updatedTasks = tasks.filter(item => item.id !== req.params.id);
		await saveTask(JSON.stringify(updatedTasks, null, 2));

		return res.status(200).json({ success: true, deletedTask, message: 'Task deleted' });
	} catch (err) {
		console.error('Deleting error:', err);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
};

export default deleteTodo;