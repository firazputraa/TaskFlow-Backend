// src/tasks/repository.js

// Impor instance prisma yang sudah kita buat.
import prisma from "../../utils/prisma.js"; // Pastikan path ini benar

/**
 * Mencari task berdasarkan judul untuk pengguna tertentu.
 * Berguna untuk mencegah duplikasi judul task per pengguna.
 * @param {string} title - Judul task yang dicari.
 * @param {string} userId - ID pengguna pemilik task.
 * @returns {Promise<Task|null>}
 */
export const findTaskByTitleAndUserId = async (title, userId) => {
  const task = await prisma.task.findFirst({
    where: { 
      title,
      userId,
    },
  });
  return task;
};

/**
 * Menemukan semua task yang dimiliki oleh satu pengguna.
 * @param {string} userId - ID pengguna.
 * @returns {Promise<Task[]>}
 */
export const findAllTasksByUserId = async (userId) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc', // Mengurutkan dari yang terbaru
    }
  });
  return tasks;
};

/**
 * Menemukan satu task berdasarkan ID uniknya.
 * @param {string} id - ID task.
 * @returns {Promise<Task|null>}
 */
export const findTaskById = async (id) => {
  const task = await prisma.task.findUnique({ where: { id } });
  return task;
};

/**
 * Membuat task baru di database.
 * @param {object} taskData - Data untuk task baru (termasuk userId).
 * @returns {Promise<Task>}
 */
export const createTask = async (taskData) => {
  const task = await prisma.task.create({
    data: {
      title: taskData.title,
      content: taskData.content,
      completed: taskData.completed || false,
      userId: taskData.userId,
    },
  });
  return task;
};

/**
 * Memperbarui data task yang ada.
 * @param {string} id - ID task yang akan diupdate.
 * @param {object} taskData - Data baru untuk task.
 * @returns {Promise<Task>}
 */
export const updateTask = async (id, taskData) => {
  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      title: taskData.title,
      content: taskData.content,
      completed: taskData.completed,
    },
  });
  return task;
};

/**
 * Menghapus task dari database.
 * @param {string} id - ID task yang akan dihapus.
 * @returns {Promise<void>}
 */
export const deleteTaskById = async (id) => {
  await prisma.task.delete({
    where: { id },
  });
};
