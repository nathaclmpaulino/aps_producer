const express = require('express')
const app = express()
const port = process.env.PORT || 3000

var server = app.listen(port, function() {
  console.log(`Producer running over port: ${port}`)
})

require('./src/index')
