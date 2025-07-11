// src/utils/parsePaginationParams.js

import { number } from 'joi';

//перетворення рядкових значень в числа
const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;
  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return parsedNumber;
};
//використаємо parseNumber для  валідації та конвертації (page і perPage),
//зі значеннями за замовчуванням 1 для page і 10 для perPage.
export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);
  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
