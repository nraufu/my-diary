import { validationResult } from 'express-validator/check';
import entries from '../models/entries';

const entry = {
    getAllEntries(req, res) {
        res.status(200).json(entries);
    },

    getEntry(req, res) {
        const found = entries.find(entry => entry.id === Number(req.params.id));
        if (found) {
            res.status(200).json(found);
        } else {
            res.status(404).json({
                errors: [{
                    msg: 'Entry does not exist.'
                }]
            });
        }
    },

    addEntry(req, res) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array()
            });
        }
        const entry = req.body;
        entry.id = entries.length + 1;
        entries.push(entry);
        return res.status(201).json(entries);
    }

}


module.exports = entry;