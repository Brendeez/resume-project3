const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const options = require('./knexfile.js');
const knex = require('knex')(options);
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

require("dotenv").config();
let app = express();
app.use((req, res, next) => {
    req.db = knex
    next();
});

app.use(cors());

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const meRouter = require('./routes/me');
const volcanoesRouter = require('./routes/volcanoes');
const volcanoRouter = require('./routes/volcano');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

logger.token('req', (req, res) => JSON.stringify(req.headers))
logger.token('res', (req, res) => {
    const headers = {}
    res.getHeaderNames().map(h => headers[h] = res.getHeader(h))
    return JSON.stringify(headers)
})
app.use('/', countriesRouter);
app.use('/', meRouter);
app.use('/', volcanoesRouter);
app.use('/', volcanoRouter);
app.use('/', indexRouter);
app.use('/user', usersRouter);

app.use("/", swaggerUi.serve);
app.get(
    "/",
    swaggerUi.setup(swaggerDoc, {
        swaggerOptions: { defaultModelsExpandDepth: -1 }, // Hide schema section
    })
);


app.get('/knex', function (req, res, next) {
        req.db.raw("SELECT VERSION()").then(
            (version) => console.log((version[0][0]))
        ).catch((err) => { console.log(err); throw err })
        res.send("Version Logged successfully");
    });




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
