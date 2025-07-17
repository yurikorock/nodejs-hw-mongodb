import { UsersCollection } from '../db/contacts/user.js';

export const registerUsers = async (payload) => {
  return await UsersCollection.create(payload);
};
