export const addTask = async (task, alarm) => {
  try {
    const res = await fetch("/tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task, alarm })
    })
    return res
  } catch (err) {
    console.error('Error:', err)
    alert(err.message)
  }
}