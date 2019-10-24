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
          res.status(404).json({ error: 'Entry does not exist.' });
        }
    }

}


module.exports = entry;