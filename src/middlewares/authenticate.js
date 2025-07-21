// src/middlewares/authenticate.js

// обробляє запит на аутентифікацію, перевіряє наявність і дійсність
// заголовка авторизації та токена доступу, шукає відповідну сесію
// та користувача, а також додає об'єкт користувача до запиту,
// якщо всі перевірки успішні.

import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/contacts/session.js';
import { UsersCollection } from '../db/contacts/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }
  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  const isAccesTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccesTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401));
  }
  req.user = user;
  next();
};
