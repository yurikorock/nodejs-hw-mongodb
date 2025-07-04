//src/routers/contacts

import { Router } from 'express';
import {
  getAllContactController,
  getContactsByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

export default router;
