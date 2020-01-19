import { query } from './index';

const usersTableQuery = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR (100) UNIQUE  NOT NULL,
    password VARCHAR (255)   NOT NULL,
    created_on TIMESTAMP  DEFAULT now() NOT NULL,
    updated_on TIMESTAMP  DEFAULT now() NOT NULL
);`;

const entriesTableQuery = `
DROP TABLE IF EXISTS entries CASCADE;
CREATE TABLE IF NOT EXISTS entries (
    id  SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    created_on TIMESTAMP  DEFAULT now() NOT NULL,
    updated_on TIMESTAMP  DEFAULT now() NOT NULL,
    title VARCHAR (100)   NOT NULL,
    description VARCHAR (1000)   NOT NULL,
    isfavorite BOOLEAN DEFAULT false NOT NULL
);`;

const createTables = () => {
      query(`${usersTableQuery} ${entriesTableQuery}`);
}  
  export default createTables;