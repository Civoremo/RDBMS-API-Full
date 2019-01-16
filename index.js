const knex = require('knex');
const knexConfig = require('./knexfile.js');
const express = require('express');

const server = express();

server.use(express.json());
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
    res.send('server connected');
});

server.listen(5001, () => console.log('server port 5001'));