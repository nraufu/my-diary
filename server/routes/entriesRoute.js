import express from 'express';
import EntryController from '../controllers/entryController';
import validate from '../middlewares/validator';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();


router.get('/entries', verifyToken, EntryController.getAllEntries);
router.get('/entries/:id', verifyToken,validate.paramValidation, EntryController.getEntry);
router.post('/entries/', verifyToken, validate.entry, EntryController.addEntry);
router.patch('/entries/:id', verifyToken, validate.paramValidation, validate.entry, EntryController.modifyEntry);
router.delete('/entries/:id', verifyToken, validate.paramValidation, EntryController.deleteEntry)

export default router;