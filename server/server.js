const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.port || 3000 ;
let app = express();

app.use(express.static(publicPath));

let server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`App started on  ${host}:${port}`);
});