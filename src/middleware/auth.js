import jwt from 'jsonwebtoken';
import { apiError } from '../error/apiError.js';

export const protect = (req, res, next) => {
  // 1. Ambil token dari header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Jika tidak ada token, tolak akses
    return next(apiError.unauthorized('Akses ditolak, token tidak tersedia'));
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verifikasi validitas token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Simpan ID pengguna dari token ke dalam object request
    // agar bisa digunakan oleh controller/service selanjutnya
    req.userId = decoded.id;

    // 4. Lanjutkan ke proses selanjutnya (controller)
    next();
  } catch (err) {
    // Jika token tidak valid (kadaluarsa, dll), tolak akses
    return next(apiError.unauthorized('Token tidak valid'));
  }
};