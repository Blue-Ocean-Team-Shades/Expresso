const express = require('express');
const app = express();
const port = 3000;
const controllers = require('./controllers.js');
const path = require('path')

app.use(express.json());

//janky fix, but it's fine because we're replacing all this with subdomains anyways
const staticPath = '../client/dist';
app.use('/index', express.static(path.resolve(__dirname, staticPath))); //broken
app.use('/details', express.static(path.resolve(__dirname, staticPath))); //broken
app.use('/login', express.static(path.resolve(__dirname, staticPath))); //works
app.use('/signup', express.static(path.resolve(__dirname, staticPath))); //works
app.use('/favorites', express.static(path.resolve(__dirname, staticPath))); //works

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
