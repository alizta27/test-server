if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express')
const routers = require('./routes');
const errorHandler = require('./middlewere/errorHandler')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 2022

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(routers);

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Go! ${port}`)
})