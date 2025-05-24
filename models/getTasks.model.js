import { readFile, writeFile } from 'fs/promises'
import path from 'path'


export const getTask = async () => {
	const filePath = path.join(import.meta.dirname, "../data/tasks.json")
	try {
	const res = await readFile(filePath, "utf-8");
	return JSON.parse(res || "[]") || []
	} catch (err) {
		if (err.code === 'ENOENT') {
			await writeFile(filePath, JSON.stringify([], null, 2), 'utf-8')
			return []
		} else {
			console.error('File error:', err);
		}
	}
}