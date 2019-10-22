const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/status', (req,res) =>{
    res.send({
        status : 'Active'
    })
})

app.listen(PORT, () => console.log(`The server is listening to port ${PORT}....`));