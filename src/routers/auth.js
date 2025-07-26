// src/routers/auth.js
import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordShema,
} from '../validation/auth.js';
import {
  loginUserController,
  logOutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
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
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
export default router;
//роут для скидання паролю через емейл
router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
// роут-відповідь для скидання паролю через емайл
router.post(
  '/reset-pwd',
  validateBody(resetPasswordShema),
  ctrlWrapper(resetPasswordController),
);
