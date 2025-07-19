//src/controllers/auth.js

import { registerUsers } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUsers(req.body);

  console.log('user create:', user);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
