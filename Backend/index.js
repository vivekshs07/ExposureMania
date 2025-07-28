require("dotenv").config();
const { server, app } = require("./src/utils/socket");
const port = process.env.PORT || 8000;
const connectdb = require("./src/db/db");
const router = require("./src/routes/router");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const express = require("express");
const path = require("path");

app.use(
  cors({
    credentials: true, 
    origin: "http://localhost:5173",  
  })
);



app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello Server!");
});



connectdb()
  .then(() => {
    server.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
