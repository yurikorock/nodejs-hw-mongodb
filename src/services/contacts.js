import { ContactsCollection } from '../db/contacts/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactsById = async (contactsId) => {
  const contact = await ContactsCollection.findById(contactsId);
  return contact;
};
