const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!PyRa is flying....')
})

app.listen(port, () => {
  console.log(`PyRa is flying on port ${port}`)
})