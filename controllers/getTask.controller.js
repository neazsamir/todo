import { getTask } from '../models/getTasks.model.js'

const getTaskController = async (req, res) => {
	try {
		const tasks = await getTask() || []
		return res.status(200).json({status: 200, tasks, success: true})
	} catch (err) {
		res.status(500).json({success: false, message: err.message})
	}
}

export default getTaskController;