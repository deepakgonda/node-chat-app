const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cloudinary = require('cloudinary').v2;

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

// Hosting Mosiac App getCloudinary apps for testing
app.get('/getCloudinaryImages', function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Credentials', 'true');
    response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    response.header('Access-Control-Allow-Headers', 'Content-Type');

    cloudinary.config({
        cloud_name: 'grandcanyon',
        api_key: '461728318934769',
        api_secret: 'SiMrGNBuKyQPcOTWTvPZSaJncjA'
    });

    let requestConfig = {
        type: 'upload',
        max_results: request.param('max_results') ? request.param('max_results') : 10,
        next_cursor: request.param('next_cursor') ?  request.param('next_cursor'): ""
    }

    cloudinary.api.resources(
        requestConfig, function (error, result) {
            // console.log(result);
            if (error) return response.send({ error: error }).status(500);

            response.json(result);
        }
    );
})