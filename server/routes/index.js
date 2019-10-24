import express from 'express';
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

module.exports = router;
