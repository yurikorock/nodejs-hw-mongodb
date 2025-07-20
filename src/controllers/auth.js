//src/controllers/auth.js

import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

import {
  loginUser,
  logOutUser,
  refreshUserSession,
  registerUsers,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUsers(req.body);

  console.log('user create:', user);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// функція loginUserController обробляє HTTP-запит на вхід користувача,
// викликає функцію аутентифікації loginUser, встановлює куки для
// збереження токенів та ідентифікатора сесії, і відправляє клієнту відповідь
// з інформацією про успішний вхід та токеном доступу.
export const loginUserController = async (req, res) => {
  //перевірка чи переданий емайл і пароль (чи вони не пусті)
  const { email, password } = req.body;
  if (!email || !password) {
    throw createHttpError(400, 'Email and password are required!');
  }
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// виконує процес обробки запиту на вихід користувача
// і взаємодію з клієнтом через HTTP.
export const logOutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logOutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
//процес оновлення сесії користувача і взаємодію з клієнтом через HTTP
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + FIFTEEN_MINUTES),
  });
};
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });
  setupSession(res, session);
  res.json({
    status: 200,
    message: 'Successfully refreshed a sesssion',
    data: { accessToken: session.accessToken },
  });
};
