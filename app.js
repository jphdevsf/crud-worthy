const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()
let quotesCollection


// Database!
const dbUrl = 'mongodb+srv://watMan:Mstrkrft1@jacob-cluster-9x1gu.mongodb.net/crud-worthy?retryWrites=true&w=majority'
const dbConfig = { useUnifiedTopology: true }

// TODO: Continue tutorial. Search 'CRUD - CREATE (continued)' @ https://zellwk.com/blog/crud-express-mongodb/i

MongoClient.connect(dbUrl, dbConfig, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  const db = client.db('crud-worthy')
  quotesCollection = db.collection('quotes')

  // setting up middleware inside MongoDB Connection, weird!
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  // Pug!
  app.set('view engine', 'pug')
  // Static resources!
  app.use(express.static(path.join(__dirname, 'public')))

  // Meat & Potatoes!
  app.get('/', (req, res) => {
    const myObj = {
      title: 'Crud Worthy',
      data: {},
      errors: {}
    }
    res.render('index', myObj)
  })
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
    console.log(req.body)
  })
  // Server!
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

module.exports = { app, quotesCollection }
