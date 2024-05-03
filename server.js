'use strict'

const http = require('http');
const debug = require('debug')('nodestore:server');
const express = require('express');
const { title } = require('process');
const { normalize } = require('path');

const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// jeito novo pelo express
// app.get('/', (req, res) => { 
//     res.send('Hello World');
// });

// app.listen(port, () => {
//     console.log(`app listening on port ${port}`);
// });

const router = express.Router();
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route);
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);

console.log('API listening in port: ' + port);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = (typeof port === 'string') ?
        'Pipe' + port :
        'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
            break;
    }
}