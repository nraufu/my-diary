import express from 'express';
import morgan from 'morgan';
import router from "./routes/index";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', router);



app.listen(PORT, () => console.log(`The server is listening to port ${PORT}....`));

module.exports = app;