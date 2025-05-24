function validateTask(task) {
  const trimmed = task.trim();

  if (trimmed.length < 4) return "Task must be at least 4 characters";
  if (trimmed.length > 30) return "Task must be at most 30 characters";

  // Allow only letters, numbers, comma, dot, and space
  const validPattern = /^[a-zA-Z0-9,\. ]+$/;
  if (!validPattern.test(trimmed)) {
    return "Only alphabets, digits, commas, dots, and spaces are allowed";
  }

  // Must include at least one letter or number
  if (!/[a-zA-Z0-9]/.test(trimmed)) {
    return "Task cannot be only spaces";
  }

  return null; // Valid
}

export default validateTask;