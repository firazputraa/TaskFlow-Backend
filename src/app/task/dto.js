// src/tasks/tasks.dto.js

/**
 * DTO untuk memformat data satu Task yang akan dikirim sebagai respons.
 * Class ini memastikan bahwa hanya data yang relevan yang dikirim ke klien.
 */
export class TaskResponseDTO {
  // Constructor menerima objek task lengkap dari database.
  constructor(task) {
    this.id = task.id;
    this.title = task.title;
    this.content = task.content;
    this.completed = task.completed;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    // Kita sengaja TIDAK menyertakan `userId` dalam respons.
  }
}

/**
 * DTO untuk memformat sebuah array dari Task.
 */
export class AllTasksResponseDTO {
  constructor(tasks) {
    // Mengubah setiap objek task dalam array menjadi instance dari TaskResponseDTO.
    return tasks.map(task => new TaskResponseDTO(task));
  }
}
