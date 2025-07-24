import { ApiError } from './apiError.js';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Untuk error yang tidak terduga
  return res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server',
  });
};