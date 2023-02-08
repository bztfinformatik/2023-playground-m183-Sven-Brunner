//
// Imports
//

//load environment
require("dotenv").config();
// module for handling http requests and responses and managing routes
const express = require("express");
// helper for concatinating paths
const path = require("path");
// import routes
const routes = require("./routes/main");
// get constants
const { STATIC_DIR } = require("./util/const");



//
// create express object (basicly a server object listening to requests)
//
const api = express();


// initialize body-parser for JSON-format
api.use(express.json());

// Setting response header to allow cross origin requests
// CORS-Settings.
api.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// set static path for public dirctory
api.use(express.static(path.join(process.cwd(), STATIC_DIR)));

// load routes
api.use(routes);

// fallback: redirect to / in case there is no routing match
api.use((req, res, next) => {
  res.redirect("/");
});

// error handler sends error message as json
api.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    errorMessage: err.message,
  });
});

//
// start server
//
api.listen(3000);
