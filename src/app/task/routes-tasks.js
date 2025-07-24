// src/tasks/tasks.routes.js

// Impor Express dan controller.
import express from 'express';
import * as taskController from './controller.js';

console.log(taskController);
// Buat instance router.
const router = express.Router();



// Definisikan rute dan hubungkan ke fungsi controller yang sesuai.
// GET /api/tasks -> Mendapatkan semua tasks
router.get("/task", taskController.getAllTasks);

// POST /api/tasks -> Membuat task baru
router.post("/task", taskController.createTask);

// GET /api/tasks/:id -> Mendapatkan satu task berdasarkan ID
router.get("/task/:id", taskController.getTaskById);

// PUT /api/tasks/:id -> Mengupdate task berdasarkan ID
router.put("/task/:id", taskController.updateTask);

// DELETE /api/tasks/:id -> Menghapus task berdasarkan ID
router.delete("/task/:id", taskController.deleteTask);

// Ekspor router sebagai default export.
export default router;
