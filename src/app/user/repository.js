import prisma from '../../utils/prisma.js';
import {hashPassword} from '../../utils/password.js'

export const findById = (id) => prisma.user.findUnique({ where: {id}});
export const findByEmail = (email) => prisma.user.findUnique({where: {email}});
export const findByUsername = (username) => prisma.user.findUnique({where: {username}});

export const findAllUser = () => prisma.user.findMany();

export const create = async (userData) => {
  // Melakukan hashing password sebelum disimpan
  const hashedPassword = await hashPassword(userData.password);
  // Menyimpan ke database dengan password yang sudah di-hash
  return prisma.user.create({
    data: { ...userData, password: hashedPassword },
  });
};

// Memperbarui user berdasarkan ID
export const update = (id, userData) => {
  return prisma.user.update({
    where: { id },
    data: userData,
  });
};

// Menghapus user berdasarkan ID
export const deleteById = (id) => {
  return prisma.user.delete({ where: { id } });
};