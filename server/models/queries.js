export default class queries {}

queries.insertUser = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';

queries.getUser = 'SELECT * FROM users WHERE email=$1';

queries.getAllEntries =`SELECT entries.id, entries.title, entries.content, entries.created_on, 
entries.updated_on, entries.is_favorite FROM entries INNER JOIN users ON entries.user_id=users.id 
WHERE (users.email=$1) ORDER BY entries.created_on DESC`;