const express = require('express');
const app = express();
const port = 3000;
const controllers = require('./controllers.js');

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
