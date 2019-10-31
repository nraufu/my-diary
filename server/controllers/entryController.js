import entries from '../models/entries';

class EntryController {

    static getAllEntries(req, res) {
        try{
            const {
                userId
            } = req.authorizedUser;
            const userEntries = entries.filter(entry => entry.userId === userId);
            if(userEntries.length !== 0) return res.status(404).json({status: 404, error: "No entry found"});
            return res.status(200).json({
                status: 200,
                entries
            });
        }catch(err){
            next(err);
        }
        
    }

    static getEntry(req, res) {
        try{
            const {
                userId
            } = req.authorizedUser;
    
            const found = entries.find(entry => entry.id === Number(req.params.id));
            if (found) return res.status(200).json({
                status: 200,
                found
            });
            if (!found) return res.status(404).json({
                status: 404,
                message: "Entry doesn't Exist"
            });
        }catch(err){
            next(err);
        }
        
    }

    static addEntry(req, res) {
        try{
            const {
                userId
            } = req.authorizedUser;
    
            const entry = req.body;
            entry.id = entries.length + 1;
            const data = {
                id: entry.id,
                userId: userId,
                Title: entry.title,
                description: entry.description,
                createdOn: new Date().toISOString(),
                isFavorite: entry.isFavorite
            }
            entries.push(data);
            return res.status(200).json({
                status: 200,
                message: "Entry successfully created",
                data
            });
        }catch(err){
            next(err);
        }
        
    }

    static modifyEntry(req, res) {
        try{
            const {
                userId
            } = req.authorizedUser;
    
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
                return res.status(200).json({ status: 200, message: "Entry successfully modified", modified});
        }
        }catch(err){
            next(err);
        }
        
}

    static deleteEntry(req, res) {
        try {
            const {
                userId
            } = req.authorizedUser;
    
            const found = entries.findIndex(entry => entry.id === Number(req.params.id));
            if (found !== -1) {
                entries.splice(found, 1);
                return res.status(204).json({
                    status: 204,
                    message: "Entry successfully Deleted"
                });
            } else if(found === -1){
                return res.status(404).json({
                    status: 404,
                    error: "Entry doesn't Exist"
                });
            }
            return res.status(403).json({
                status: 403,
                error: "Entry is Off limits"
            })
        }
    
    catch(err){
            next(err);
        }
        
}
}


export default EntryController;