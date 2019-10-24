import express from 'express';
import getAllEntries from '../controllers/getAllEntries';

const router =express.Router();

 
/* GET API base */
router.get('/', (req,res) => {
    res.json({
        myDiary: 'API v1'
    })
});

/* GET all user entries */
router.get('/entries', getAllEntries);

module.exports = router;
