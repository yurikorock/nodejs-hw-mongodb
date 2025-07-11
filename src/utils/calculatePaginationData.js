// src/utils/calculatePaginationData.js
// повертає об'єкт з повною інформацією про пагінацію,
// включно з поточною сторінкою, кількістю елементів на сторінці,
// загальною кількістю елементів, загальною кількістю сторінок,
// індикаторами наявності наступної та попередньої сторінок.

export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviosPage = page !== 1;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviosPage,
  };
};
