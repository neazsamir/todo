export const getTask = async () => {
	try {
		const res = await fetch('/tasks')
		const data = await res.json()
		return data
	} catch (err) {
		alert(err.message)
	}
}