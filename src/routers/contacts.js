//src/routers/contacts

import { Router } from 'express';
import {
  getAllContactController,
  getContactsByIdController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', getAllContactController);

router.get('/contacts/:contactId', getContactsByIdController);

export default router;
