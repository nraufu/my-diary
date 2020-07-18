export default class queries {}

queries.insertUser = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';

queries.getUser = 'SELECT * FROM users WHERE email=$1';

queries.getAllEntries = `SELECT entries.id, entries.title, entries.description, entries.created_on, 
entries.updated_on, entries.isFavorite FROM entries INNER JOIN users ON entries.user_id=users.id 
WHERE (users.email=$1) ORDER BY entries.created_on DESC`;

queries.insertEntry = `INSERT INTO entries (user_id, title, description, isFavorite) 
VALUES ((SELECT id from users WHERE email=$1), $2, $3, $4) 
RETURNING id, title, description, isFavorite, created_on`;

queries.getEntry = `SELECT entries.id, entries.title, entries.description, 
entries.created_on, entries.isFavorite FROM entries INNER JOIN users ON entries.user_id = users.id 
WHERE users.email=$1 AND entries.id=$2`;

queries.updateEntry = `UPDATE entries SET title = COALESCE($1, title), 
description = COALESCE($2, description),isFavorite = COALESCE($3, isFavorite) 
FROM users WHERE entries.user_id=users.id AND users.email=$4
AND entries.id=$5 RETURNING entries.id, entries.title, 
entries.description, entries.isFavorite, entries.created_on`;

queries.deleteEntry = `DELETE FROM entries USING users 
WHERE entries.user_id=users.id AND users.email=$1 AND entries.id=$2`;