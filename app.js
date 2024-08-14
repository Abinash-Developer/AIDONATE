const express = require("express");
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
app.use("/users", USERROUTE);
app.use("/admin", ADMINROUTE);
app.use("/api/v1/", COMMONROUTE);
app.use("/",DASHBOARD);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
