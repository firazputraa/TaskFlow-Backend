import express from 'express'
import * as userController from './controller.js';
import {protect} from '../../middleware/auth.js'
import {registerSchema,loginSchema,updateProfileSchema,updatePasswordSchema} from './schema.js';
import { validate } from '../../middleware/validasi.js';

const router = express.Router();
router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);

router.use(protect);

router.get('/user',  userController.getAllUser);

router.get('/me', userController.getUser);
router.patch('/me', validate(updateProfileSchema),userController.updateUser);
router.patch('/password', validate(updatePasswordSchema),userController.updatePassword)
router.delete('/me', userController.deleteUserAccount);

export default router;
