const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

dotenv.config({path: '.env'});
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, "views"));

//loading public assets
app.use('/css', express.static(path.resolve(__dirname, "public/assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "public/assets/js")));
app.use('/img', express.static(path.resolve(__dirname, "public/assets/img")));

//User Routes
const userRoutes = require('./routes/users');

app.use('/', userRoutes);

app.listen(PORT, () => console.log(`app is listing to ${PORT}`));