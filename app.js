const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/database');
const USERROUTE = require('./routes/user');
const ADMINROUTE = require('./routes/admin');
connectDB();
const port = process.env.PORT || 5555;
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', USERROUTE);
app.use('/admin', ADMINROUTE);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});