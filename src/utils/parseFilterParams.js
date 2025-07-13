// src/utils/parseFilterParams.js

//перевіряє, чи введене значення є рядком та чи входить
//воно до дозволеного списку значень 'home', 'personal', 'work'
const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['home', 'personal', 'work'].includes(contactType);
  if (isContactType(contactType)) return contactType;
};
//перевіряє чи значення є рядком та чи входить
//воно до дозволеного списку значень isFavourite
const parseIsFavourite = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;
  if (isFavourite === 'true') return true;
  if (isFavourite === 'false') return false;
};

//приймає об'єкт query, з якого витягує ці параметри,
//обробляє їх через відповідні функції та збирає результати
//в один об'єкт, який включає оброблені та валідовані параметри.
export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;
  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
