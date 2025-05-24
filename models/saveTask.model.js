import { writeFile } from 'fs/promises'
import path from 'path'
export const saveTask = async (task) => {
	const filePath = path.join(import.meta.dirname, "../data/tasks.json")
	await writeFile(filePath, task, "utf-8")
}