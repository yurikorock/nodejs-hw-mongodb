// src/routers/auth.js
import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logOutUserController,
  registerUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logOutUserController));
export default router;
