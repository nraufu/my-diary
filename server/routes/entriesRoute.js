import express from 'express';
import EntryController from '../controllers/entryController';
import validate from '../middlewares/validator';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();


/* GET API base */
router.get('/', (req, res) => {
    res.status(200).json({
        Message: 'Welcome To My Diary'
    });
});

/* GET all user entries */
router.get('/entries', verifyToken, EntryController.getAllEntries);

/* GET a single entry */
router.get('/entries/:id', verifyToken,validate.paramValidation, EntryController.getEntry);

/* POST a new entry */
router.post('/entries/', verifyToken, validate.entry, EntryController.addEntry);

/* PUT new a data in existing entry */
router.patch('/entries/:id', verifyToken, validate.paramValidation, validate.entry, EntryController.modifyEntry);

router.delete('/entries/:id', verifyToken, validate.paramValidation, EntryController.deleteEntry)

export default router;