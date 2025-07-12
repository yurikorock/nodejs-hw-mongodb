import { SORT_ORDER } from '../constants/index,js';
import { ContactsCollection } from '../db/contacts/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
}) => {
  const limit = perPage;

  //розраховує зміщення (skip), що дорівнює кількості записів,
  //що мають бути пропущені перед початком видачі на поточній сторінці.
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  //запит для визначення загальної кількості контактів
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  // запит до бази даних для отримання списку студентів,
  //використовуючи спеціальні методи skip та limit для застосування пагінації.
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  //обраховує і повертає дані для пагінації, зокрема інформацію про загальну
  //кількість сторінок і чи є наступна чи попередня сторінка.
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (contactsId) => {
  const contact = await ContactsCollection.findById(contactsId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};
export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      upsert: false,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
  };
};
