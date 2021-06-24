const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
require('dotenv').config()
const mongoose = require('mongoose');

const userRouters = require('./routes/usersRoutes');
const videoRouters = require('./routes/videoRoutes');
const priceRouters = require('./routes/priceRoutes');
const HttpError = require('./models/httpError');

const app = express();

//GLOBAL MIDDLEWARE

//set Security http headers
app.use(helmet());

//set maximum amount of limit request from an ip address in an hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in an hour!'
});

app.use('/api', limiter);

///Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//Data SanitizaTION AGAINST NoSQL  query injection
app.use(mongoSanitize());

//Data Sanitization against XSS i.e html codes
app.use(xss());

/// Allow CORS ////
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

////API ROUTES///
app.use('/api/v1/users', userRouters);
app.use('/api/v1/videos', videoRouters);
app.use('/api/v1/videos/price', priceRouters);

////HANDLING ERROR ROUTES//////
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);

    throw error;
});

app.use((error, req, res, next) => {

    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500).json({
        message: error.message || 'An unknown error occured'
    });
});

const DB_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ekqdr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(DB_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
    .then(() => {
        app.listen(process.env.PORT || 5000, (req, res) => {
            console.log(`Server started on port 5000`);
        });
    })
    .catch(err => {
        console.log(err);
    });