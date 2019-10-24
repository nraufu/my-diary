import express from 'express';
import morgan from 'morgan';
import router from "./routes/index";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));

app.use('/api/v1', router);
app.use(express.static('./ui'));



app.listen(PORT, () => console.log(`The server is listening to port ${PORT}....`));

module.exports = app;