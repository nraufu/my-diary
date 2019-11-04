export default class queries {}

queries.insertUser = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *';

queries.getUser = 'SELECT * FROM users WHERE email=$1';