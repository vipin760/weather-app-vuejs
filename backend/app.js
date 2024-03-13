const express = require('express')
const cors = require('cors')
const errorMiddleware = require('./middleware/errors');
const app = express()
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(cookieParser())

//////routes
const user_route = require('./routes/user.routes');
app.use("/api/v2",user_route);
app.use(errorMiddleware)

module.exports = app