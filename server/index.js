const express = require('express');
const app = express();
const port = 3000;
const controllers = require('./controllers.js');

app.use(express.static('public'));
app.use(express.json());

app.get('/api/books', controllers.get);
app.post('/api/books', controllers.post);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
