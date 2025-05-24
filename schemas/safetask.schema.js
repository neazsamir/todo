import { z } from 'zod'

const todoTaskSchema = z.string()
  .min(4, "Task must be at least 4 characters")
  .max(30, "Task must be at most 30 characters")
  .regex(/^[a-zA-Z0-9,.\s'"]+$/, "Only alphabets, digits, commas, dots, quotes, and spaces are allowed")
  .refine((val) => /[a-zA-Z0-9]/.test(val), "Task cannot be only spaces");

export default todoTaskSchema;