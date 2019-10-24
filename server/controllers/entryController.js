import entries from '../models/entries';

const getAllEntries = (req, res) => {
  res.status(200).json(entries);
};

module.exports = getAllEntries;