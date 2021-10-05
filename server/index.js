const express = require('express')
var db = require('./dbhandler.js')
const cors = require('cors')

//app.use(express.json());

const app = express()
app.use(cors())
app.use(require('./routes/users'))

const port = process.env.port || 3000

app.listen(port, () => console.log('Server started'))
