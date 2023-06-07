const express = require("express");
const app = express();
const dbconnect = require("./config/dbConnection");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/Errorhandler");
const userRouters = require("./routes/userRouters");

dbconnect.dbconnect();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouters);

app.use(errorHandler);

app.listen(process.env.PORTNO, () => {
  console.log("server started listening to port 8080");
});
