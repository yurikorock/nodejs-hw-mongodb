//src/controllers/contacts.js

import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';

//отримання колекції всіх контактів

export const getAllContactController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({ data: contacts });
};

//отримання контакта за його id

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);

  // Відповідь, якщо контакт не знайдено
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contact,
  });
};
//для створення нового контакту
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
//видалення контакту
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};
//оновлення даних існуючого контакту
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result.contact,
  });
};
