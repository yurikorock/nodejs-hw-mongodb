// // src/middlewares/checkRoles.js

// import createHttpError from 'http-errors';
// import { ROLES } from '../constants/index.js';
// import { ContactsCollection } from '../db/contacts/contacts.js';

// export const checkRoles =
//   (...roles) =>
//   async (req, res, next) => {
//     const { user } = req;
//     if (!user) {
//       next(createHttpError(401));
//     }
//     const { role } = user;
//     // Якщо роль ADMIN і запитується доступ, дозволяємо
//     if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
//       next();
//       return;
//     }
//     // Якщо роль USER і користувач просить доступ до власного контакту
//     if (roles.includes(ROLES.USER) && role === ROLES.USER) {
//       const { contactId } = req.params;
//       if (!contactId) {
//         next(createHttpError(403));
//         return;
//       }
//       const contact = await ContactsCollection.findOne({
//         _id: contactId,
//         userId: user._id,
//       });

//       if (contact) {
//         next();
//         return;
//       }
//     }
//     next(createHttpError(403));
//   };
