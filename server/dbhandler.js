const sqlite3 = require('sqlite3').verbose()

function createDB() {
  var fs = require('fs'),
    spawn = require('child_process').spawn,
    child = spawn('sqlite3', ['mydb.db'])

  fs.createReadStream('./server/USER_NAMES.sql').pipe(child.stdin)

  var mydb = new sqlite3.Database('mydb.db')
  return mydb
}

async function queryDB(mydb, query) {
  return new Promise(function (resolve, reject) {
    mydb.all(query, function (err, rows) {
      if (err) {
        return reject(err)
      }
      resolve(rows)
    })
  })
}

function createResponse(rows) {
  var response = {}
  var random = 0
  for (let i = 0; i < 6; i++) {
    var random = Math.floor(Math.random() * 101)
    response[random] = rows[i].user_name
  }
  return response
}

function separateHigh(result) {
  var high = {}
  var numbers = Object.keys(result)
  var users = Object.values(result)
  high[numbers[5]] = users[5]
  delete result[numbers[5]]
  return high
}

async function waitHigh(result) {
  return new Promise(function (resolve, reject) {
    separateHigh(result, function (err, high) {
      if (err) {
        return reject(err)
      }
      resolve(high)
    })
  })
}

exports.createDB = createDB
exports.queryDB = queryDB
exports.createResponse = createResponse
exports.waitHigh = waitHigh
