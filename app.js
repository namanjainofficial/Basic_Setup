const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const ErrorMiddleware = require('./middleware/error')


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: './.env' })
}


//middleware
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(ErrorMiddleware)
app.use(express.urlencoded({ extended: true }))


//routes
const auth = require('./routes/authRoutes');
const user = require('./routes/userRoutes')

app.use("/api/auth", auth);
app.use("/api/users", user);

module.exports = app;
