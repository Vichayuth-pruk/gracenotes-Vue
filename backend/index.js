const express = require("express")
var cors = require('cors')
const path = require("path")

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// routers
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const userRouter = require('./routes/user');
const socialRouter = require('./routes/social');
const graceRouter = require('./routes/grace');
const reportRouter = require('./routes/report');
const replyRouter = require('./routes/reply');
const pool = require("./config");
// use routers
app.use(loginRouter.router)
app.use(registerRouter.router)
app.use(userRouter.router)
app.use(socialRouter.router)
app.use(graceRouter.router)
app.use(reportRouter.router)
app.use(replyRouter.router)

app.listen(5000, () => {
  console.log(`database running at http://localhost:5000`)
})