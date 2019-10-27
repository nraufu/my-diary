import { validationResult } from 'express-validator';
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
        return res.status(201).json(entry);
    },

    modifyEntry(req, res) {
        const error = validationResult(req);
        const indexOfFound = entries.findIndex(entry => entry.id === Number(req.params.id));

        if(indexOfFound !== -1 && error.isEmpty()){
            const found = { ...entries[indexOfFound] };
            entries[indexOfFound] = { ...found, ...req.body };
            return res.status(200).json(entries[indexOfFound]);
        }else if(indexOfFound === -1) {
            return res.status(404).json({errors: [{msg: 'Entry does not exist'}]})
        }
        return res.status(400).json({errors: error.array() });

    },

    deleteEntry(req, res) {
        const indexOfFound = entries.findIndex(entry => entry.id === Number(req.params.id));
        if (indexOfFound !== -1) {
          entries.splice(indexOfFound, 1);
          res.status(204).json();
        } else {
          res.status(404).json({ errors: [{ msg: 'Entry does not exist' }] });
        }
    }

}


module.exports = entry;