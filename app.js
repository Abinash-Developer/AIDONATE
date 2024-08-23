const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");

require("dotenv").config();
const connectDB = require("./config/database");
const USERROUTE = require("./routes/user");
const ADMINROUTE = require("./routes/admin");
const COMMONROUTE =  require("./routes/common");
const DASHBOARD = require("./routes/admindashboard");
connectDB();
const port = process.env.PORT || 5555;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://abinashupwork:05eW12AU4yobTR5u@cluster0.qhy1cum.mongodb.net/aidonate07',
    collectionName: 'sessions'
  }),
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 
  }
}));
app.use("/users", USERROUTE);
app.use("/admin", ADMINROUTE);
app.use("/api/v1/", COMMONROUTE);
app.use("/",DASHBOARD);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
