// src/services/auth.js
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';

import { UsersCollection } from '../db/contacts/user.js';
import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/contacts/session.js';
import { FIFTEEN_MINUTES } from '../constants/index.js';
import { ONE_DAY } from '../constants/index.js';

//реєстрація користувача
export const registerUsers = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await UsersCollection.create({
    name: payload.name,
    email: payload.email,
    password: encryptedPassword,
  });
};
//аутентифікація користувача
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
  await SessionsCollection.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
// логаут користувача
export const logOutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
