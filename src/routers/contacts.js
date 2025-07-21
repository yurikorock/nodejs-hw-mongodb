//src/routers/contacts

import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getAllContactController,
  getContactsByIdController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactsSchema,
  updateContactsSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';

const router = Router();
router.use(authenticate);

router.post(
  '/',
  // checkRoles(ROLES.ADMIN),
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  // checkRoles(ROLES.ADMIN),
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/:contactId',
  // checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  validateBody(updateContactsSchema),
  ctrlWrapper(patchContactController),
);

router.get(
  '/',
  // checkRoles(ROLES.ADMIN),
  ctrlWrapper(getAllContactController),
);

router.get(
  '/:contactId',
  // checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

export default router;
