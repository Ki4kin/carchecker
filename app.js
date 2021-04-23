const express = require('express')
const app = express();
const useMiddleware = require('./middleware')
const indexRouter = require('./route/index')
const useErrorHandlers = require("./middleware/error-handlers")

useMiddleware(app)

app.use("/", indexRouter)

useErrorHandlers(app)

module.exports = app
