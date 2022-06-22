const express = require('express')
const path = require('path')
const app = express()
require('../dataBase/pool')

app.use('/', express.static(path.join(__dirname, '../build')));
app.use(express.json())

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))

app.get('/dashBoard', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, './pageNotFound.html'))
})


app.listen(9999, () => console.log('server running on 9999'))