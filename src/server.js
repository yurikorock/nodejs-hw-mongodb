// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactsById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true,
        },
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  //маршрут для отримання колекції всіх контактів
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({ data: contacts });
  });

  //маршрут для отримання контакта за його id
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);

    // Відповідь, якщо контакт не знайдено
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    // Відповідь, якщо контакт знайдено
    res.status(200).json({
      status: '200',
      message: 'Successfully found contacts!',
      data: contact,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
