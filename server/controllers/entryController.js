import '@babel/polyfill';
import {
    query
} from '../models/index';
import queries from '../models/queries';
import entries from '../models/entries';

class EntryController {

    static async getAllEntries(req, res, next) {
        try {
            const userEntries = await query(queries.getAllEntries,
                [req.authorizedUser.email]);

            return res.status(200).json({
                status: 200,
                Entries: userEntries.rows
            });
        } catch (error) {
            next(error);
        }

    }

    static async getEntry(req, res, next) {
        try {
            const entry = await query(queries.getEntry, [req.authorizedUser.email, req.params.id]);

            if (!entry.rowCount) {
                return res.status(404).json({
                    status: 404,
                    error: "Entry doesn't Exist"
                });
            } else {
                return res.status(200).json({
                    status: 200,
                    message: "Entry successfully found",
                    entry: entry.rows[0]
                });
            }
        } catch (err) {
            next(err);
        }

    }

    static async addEntry(req, res, next) {
        try {
            const {
                title,
                description,
                isFavorite
            } = req.body;
            const newEntry = await query(queries.insertEntry,
                [req.authorizedUser.email, title, description, isFavorite]);
            res.status(201).json({
                status: 201,
                message: "Entry successfully created",
                newEntry: newEntry.rows[0]
            });
        } catch (err) {
            next(err);
        }

    }

    static modifyEntry(req, res) {
        try {
            const {
                title,
                description,
                isFavorite
            } = req.body;
            const newDate = new Date().toISOString();
            const found = entries.find(entry => entry.id === Number(req.params.id));
            if (!found) {
                return res.status(404).json({
                    status: 404,
                    error: "Entry doesn't Exist"
                })
            }
            if (found) {
                found.title = title;
                found.description = description;
                found.createdOn = newDate;
                found.isFavorite = isFavorite;
                const modified = found;
                return res.status(200).json({
                    status: 200,
                    message: "Entry successfully modified",
                    modified
                });
            }
        } catch (err) {
            next(err);
        }

    }

    static deleteEntry(req, res) {
        try {
            const found = entries.findIndex(entry => entry.id === Number(req.params.id));
            if (found !== -1) {
                entries.splice(found, 1);
                return res.status(204).json({
                    status: 204,
                    message: "Entry successfully Deleted"
                });
            } else if (found === -1) {
                return res.status(404).json({
                    status: 404,
                    error: "Entry doesn't Exist"
                });
            }
            return res.status(403).json({
                status: 403,
                error: "Entry is Off limits"
            })
        } catch (err) {
            next(err);
        }

    }
}


export default EntryController;