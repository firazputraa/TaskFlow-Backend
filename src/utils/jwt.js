import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });