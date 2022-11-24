const createError = require("http-errors");
const express = require("express");

const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//
require("dotenv").config();
//
// ---knex---
const options = require("./knexfile");
const knex = require("knex")(options);
// ---knex---

// ---swagger---
const swaggerUI = require('swagger-ui-express'); 
const swaggerDocument = require('./docs/swagger.json'); 
// ---swagger---

//---*---
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('./sslcert/server.key','utf8');
const certificate = fs.readFileSync('./sslcert/server.cert','utf8')
const credentials = {key: privateKey, cert: certificate};
//---*---

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// const app = express();

const helmet = require('helmet');
const cors = require("cors");
app.use(logger('common'));
app.use(helmet());
// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ---knex---
app.use((req, res, next) => {
  req.db = knex;
  next();
});
// ---knex---

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)) 

app.get("/knex", function (req, res, next) {
  req.db
    .raw("SELECT VERSION()")
    .then((version) => console.log(version[0][0]))
    .catch((err) => {
      console.log(err);
      throw err;
    });

  res.send("Version logged successfully");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


const port = 443;
// // ---create server---
const server = https.createServer(credentials,app).listen(port, () => {
console.log('server running at ' + port)
})

// server.listen(443);
// ---create server---

module.exports = app;
