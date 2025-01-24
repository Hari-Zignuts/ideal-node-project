// core modules import
const express = require("express");
const cors = require('cors')
const path = require("path");

// all routes handler import
const apiRoutes = require('./router/index');
const globalErrorHandler = require("./controller/errorController");

// custom middleware import
const selectLanguage = require("./middleware/i18n");

// custom modules import
const catchAsync = require("./utils/catchAsync");
const { default: AppError } = require("./utils/appError");
const i18n = require("./config/i18n");

// app initialization 
const app = express();

// cors setup
app.use(cors());

// Set up EJS as the templating engine
app.set("view engine", "ejs");

// Set the directory where your EJS views are located
app.set("views", path.join(__dirname, "views"));

// global middlewares
app.use(express.json());
app.use(i18n.init);
app.use(selectLanguage);

// all routes
app.use("/api/v1", apiRoutes);

// 404 route handler
app.use(
  "*",
  catchAsync(async (req) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  })
);

// global error handler
app.use(globalErrorHandler);

// export app
module.exports = app;
