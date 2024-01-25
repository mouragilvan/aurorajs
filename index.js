const express  = require('express');
const routes = require('./src/routes');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

routes(app);

app.listen(8080);