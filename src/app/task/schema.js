// src/tasks/tasks.schema.js

import { z } from 'zod';

// Skema untuk memvalidasi body saat membuat task baru.
export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }).min(3, { message: "Title must be at least 3 characters long" }),
    
    content: z.string().nullable().optional(),
    
    completed: z.boolean().optional(),
  }),
});

// Skema untuk memvalidasi body saat memperbarui task.
export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().nullable().optional(),
    completed: z.boolean().optional(),
  }).refine(data => Object.keys(data).length > 0, {
    message: "Update body cannot be empty", // Mencegah body update kosong
  }),
});

// Skema untuk memvalidasi parameter URL (misalnya /tasks/:id).
export const paramsSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Task ID parameter is required" }),
  }),
});
