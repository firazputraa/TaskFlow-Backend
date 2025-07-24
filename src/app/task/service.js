// src/tasks/service.js
import * as taskRepository from './repository.js';
import { apiError } from '../../error/apiError.js'; // Asumsi Anda punya file error handler kustom

/**
 * Mengambil semua task milik pengguna tertentu.
 */
export const getAllTasksByUserId = async (userId) => {
  const tasks = await taskRepository.findAllTasksByUserId(userId);
  return tasks;
};

/**
 * Mengambil satu task dan memverifikasi kepemilikannya.
 */
export const getTaskByIdAndUser = async (taskId, userId) => {
  const task = await taskRepository.findTaskById(taskId);

  if (!task) {
    throw apiError.notFound("Task not found");
  }

  if (task.userId !== userId) {
    throw apiError.forbidden("You are not authorized to access this task");
  }

  return task;
};

/**
 * Membuat task baru untuk pengguna tertentu.
 */
export const createTask = async (taskData, userId) => {
  const existingTask = await taskRepository.findTaskByTitleAndUserId(taskData.title, userId);
  if (existingTask) {
    throw apiError.badRequest('You already have a task with the same title');
  }

  const dataToSave = { ...taskData, userId };
  const newTask = await taskRepository.createTask(dataToSave);
  return newTask;
};

/**
 * Memperbarui task milik pengguna tertentu.
 */
export const updateTask = async (taskId, taskData, userId) => {
  await getTaskByIdAndUser(taskId, userId); // Verifikasi kepemilikan
  const updatedTask = await taskRepository.updateTask(taskId, taskData);
  return updatedTask;
};

/**
 * Menghapus task milik pengguna tertentu.
 */
export const deleteTask = async (taskId, userId) => {
  await getTaskByIdAndUser(taskId, userId); // Verifikasi kepemilikan
  await taskRepository.deleteTaskById(taskId);
};
