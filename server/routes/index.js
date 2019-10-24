import express from 'express';
import { check } from 'express-validator/check';
import entry from '../controllers/entryController';

const router =express.Router();

 
/* GET API base */
router.get('/', (req,res) => {
    res.json({
        myDiary: 'API v1'
    })
});

/* GET all user entries */
router.get('/entries', entry.getAllEntries);

/* GET a single entry */
router.get('/entries/:id', entry.getEntry);

/* POST a new entry */
router.post('/entries/', [check('timestamp').isInt(), check('title').isString(), check('content').isString()], entry.addEntry);

module.exports = router;
