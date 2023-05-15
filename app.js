const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const ErrorMiddleware = require('./middleware/error')
//var bodyParser = require('body-parser')


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: './.env' })
}
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())
//middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(ErrorMiddleware)
app.use(express.urlencoded({ extended: true }))


//routes
const auth = require('./routes/authRoutes');
const customer = require('./routes/customerRoutes');

app.use("/api/auth", auth);
app.use("/api/customer", customer);

module.exports = app;
