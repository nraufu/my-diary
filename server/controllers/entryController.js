import '@babel/polyfill';
import { query } from '../models/index';
import queries from '../models/queries';


class EntryController {

    static async getAllEntries(req, res, next) {
        try {
            const userEntries = await query(queries.getAllEntries, [req.authorizedUser.email]);
            if(!userEntries.rowCount) return res.status(404).json({ status: 404, message: 'No entry found' });
            return res.status(200).json({ status: 200, message: 'Entries successfully found', Entries: userEntries.rows });
        } catch (error) {
            next(error);
        }

    }

    static async getEntry(req, res, next) {
        try {
            const entry = await query(queries.getEntry, [req.authorizedUser.email, req.params.id]);
            if (!entry.rowCount) {
                return res.status(404).json({ status: 404, error: "Entry doesn't Exist" });
            } else {
                return res.status(200).json({ status: 200, message: "Entry successfully found", entry: entry.rows[0] });
            }
        } catch (err) {
            next(err);
        }

    }

    static async addEntry(req, res, next) {
        try {
            const { title, description, isfavorite } = req.body;
            const newEntry = await query(queries.insertEntry, [req.authorizedUser.email, title, description, isfavorite]);
            res.status(201).json({ status: 201, message: "Entry successfully created", newEntry: newEntry.rows[0] });
        } catch (err) {
            next(err);
        }

    }

    static async modifyEntry(req, res, next) {
        try {
            const { title, description, isfavorite } = req.body;
      const entry = await query(queries.getEntry,[req.authorizedUser.email, req.params.id]);
      if (!entry.rowCount) return res.status(404).json({ status: 404, error: "entry doesn't exist" });

        const updatedEntry = await query(queries.updateEntry,[title, description, isfavorite, req.authorizedUser.email, req.params.id]);
        return res.status(200).json({status: 200, message: 'Entry modified Successfully', Entry:updatedEntry.rows[0]});
        } catch (err) {
            next(err);
        }

    }

    static async deleteEntry(req, res, next) {
        try {
            const deleted = await query(queries.deleteEntry,
                [req.authorizedUser.email, req.params.id]);
              if (!deleted.rowCount) return res.status(404).json({status: 404, error: "Entry doesn't Exist"});

              return res.status(204).json();
            
        } catch (err) {
            next(err);
        }

    }
}


export default EntryController;