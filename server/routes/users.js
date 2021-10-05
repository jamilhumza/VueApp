const express = require('express')
const router = express.Router()
var db = require('../dbhandler.js')

router.get('/', async (req, res) => {
  var mydb = db.createDB()
  var sql = `SELECT user_name FROM USER_NAMES LIMIT 6`
  const rows = await db.queryDB(mydb, sql)
  result = db.createResponse(rows)
  var high = {}
  var numbers = Object.keys(result)
  var users = Object.values(result)
  high[numbers[5]] = users[5]
  delete result[numbers[5]]
  //tried to fix empty high object by making async function but returns "hmr waiting for update signal from wds" in browser
  //var high = await db.waitHigh(result)
  res.send({ result, high })
})

module.exports = router
