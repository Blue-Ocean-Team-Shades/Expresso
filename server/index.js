const express = require('express');
const app = express();
const port = 3000;
const controllers = require('./controllers.js');
const path = require('path')

app.use(express.json());

//janky fix, but it's fine because we're replacing all this with subdomains anyways
const staticPath = '../client/dist';
app.use('/details*', express.static(path.resolve(__dirname, staticPath)));
app.use('/login*', express.static(path.resolve(__dirname, staticPath)));
app.use('/signup*', express.static(path.resolve(__dirname, staticPath)));
app.use('/favorites*', express.static(path.resolve(__dirname, staticPath)));
app.use('*', express.static(path.resolve(__dirname, staticPath)));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
