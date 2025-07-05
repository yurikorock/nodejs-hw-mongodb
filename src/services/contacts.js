import { ContactsCollection } from '../db/contacts/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactsById = async (contactsId) => {
  const contact = await ContactsCollection.findById(contactsId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};
