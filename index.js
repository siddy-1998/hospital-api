const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'));

//Server listening to request
app.listen(port, function (err) {
    if (err) {
        return console.log(`Error in running the server : ${err}`);
    }
    console.log(`App running on port ${port}`);
})