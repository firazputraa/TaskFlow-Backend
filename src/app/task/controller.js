// src/tasks/controller.js
import * as taskService from './service.js';
import { TaskResponseDTO, AllTasksResponseDTO } from './dto.js';

/**
 * Menangani permintaan untuk membuat task baru.
 */
export const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id; // Diambil dari middleware autentikasi
    const taskData = req.body;

    const task = await taskService.createTask(taskData, userId);
    const taskResponse = new TaskResponseDTO(task);
    
    res.status(201).json({
      status: 'success',
      data: taskResponse,
      message: "Task created successfully"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani permintaan untuk mengambil semua task milik pengguna.
 */
export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const tasks = await taskService.getAllTasksByUserId(userId);
    const tasksResponse = new AllTasksResponseDTO(tasks);
    
    res.status(200).json({
      status: 'success',
      data: tasksResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani permintaan untuk mengambil satu task spesifik.
 */
export const getTaskById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    
    const task = await taskService.getTaskByIdAndUser(taskId, userId);
    const taskResponse = new TaskResponseDTO(task);
    
    res.status(200).json({
      status: 'success',
      data: taskResponse,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani permintaan untuk memperbarui task.
 */
export const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const taskData = req.body;

    const updatedTask = await taskService.updateTask(taskId, taskData, userId);
    const taskResponse = new TaskResponseDTO(updatedTask);
    
    res.status(200).json({ 
        status: 'success',
        data: taskResponse, 
        message: "Task updated successfully" 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menangani permintaan untuk menghapus task.
 */
export const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    
    await taskService.deleteTask(taskId, userId);
    
    res.status(200).json({ 
        status: 'success',
        message: "Task deleted successfully" 
    });
  } catch (error) {
    next(error);
  }
};
