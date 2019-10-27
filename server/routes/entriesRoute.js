import express from 'express';
import entry from '../controllers/entryController';
import validate from '../middlewares/validator';

const router = express.Router();


/* GET API base */
router.get('/', (req, res) => {
    res.send({
        myDiary: 'API v1'
    })
});

/* GET all user entries */
router.get('/entries',  entry.getAllEntries);

/* GET a single entry */
router.get('/entries/:id', entry.getEntry);

/* POST a new entry */
router.post('/entries/', validate.entry, entry.addEntry);

/* PUT new a data in existing entry */
router.put('/entries/:id', validate.entry, entry.modifyEntry);

router.delete('/entries/:id', entry.deleteEntry)

    
module.exports = router;