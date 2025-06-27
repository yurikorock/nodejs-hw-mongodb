// src/index.js

import { initMongoDB } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};
//bootstrap, буде ініціалізувати підключення до бази даних, після чого запускати сервер.
bootstrap();
