//src/controllers/contacts.js

import { getAllContacts, getContactsById } from '../services/contacts.js';

//отримання колекції всіх контактів

export const getAllContactController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({ data: contacts });
};

app.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({ data: contacts });
});

//отримання контакта за його id

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);

  // Відповідь, якщо контакт не знайдено
  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }
  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contact,
  });
};
