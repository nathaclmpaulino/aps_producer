const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (_req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Producer running over port: ${port}`)
})

require('./src/index')
