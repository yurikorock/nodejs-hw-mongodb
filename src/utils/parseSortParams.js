// src/utils/parseSortParams.js
import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  //перевіряє, чи відповідає він одному з відомих
  //порядків сортування — або зростанню(ASC), або спаданню(DESC).
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};
//перевіряємо, чи входить дане поле до списку допустимих полів (наприклад, _id, name)
const parseSortBy = (sortBy) => {
  const keysOfContact = ['_id', 'name'];
  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};
//приймає об'єкт query, з якого витягує значення sortOrder та sortBy,
//передає їх на обробку у відповідні функції та повертає об'єкт із
//валідованими та готовими до використання параметрами для сортування.
export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
