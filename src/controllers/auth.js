//src/controllers/auth.js

import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

import { loginUser, registerUsers } from '../services/auth.js';

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
