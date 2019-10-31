import express from 'express';
import morgan from 'morgan';
import entryRoute from "./routes/entriesRoute";
import userRoute from './routes/userRoute';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

app.use('/api/v1', entryRoute);
app.use('/api/v1/auth', userRoute);
app.use(express.static('./ui'));

// index route
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

app.listen(PORT, () => console.log(`The server is listening to port ${PORT}....`));

export default app;