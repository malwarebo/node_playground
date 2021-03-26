const { response } = require('express');
const express = require('express');

const app = express();

const port = 3000;

app.get('/', (request, response) => {
    response.send('This is express app!');
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});