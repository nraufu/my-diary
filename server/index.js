import express from 'express';
import morgan from 'morgan';
import entryRoute from "./routes/entriesRoute";
import userRoute from './routes/userRoute';
import createTables from './models/createTables';

// create database tables if they are not existing yet
createTables();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

/* GET API base */
app.get('/', (req, res) => {
    res.status(200).json({
        Message: 'Welcome To My Diary'
    });
});

app.use('/api/v1', entryRoute);
app.use('/api/v1/auth', userRoute);

app.listen(PORT);

export default app;