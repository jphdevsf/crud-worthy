const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()
let quotesCollection

// Database!
const dbUrl = 'mongodb+srv://watMan:Mstrkrft1@jacob-cluster-9x1gu.mongodb.net/crud-worthy?retryWrites=true&w=majority'
const dbConfig = { useUnifiedTopology: true }
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
    db.collection('quotes').find().toArray()
      .then(quotes => {
        const myObj = {
          title: 'Crud Worthy',
          data: {},
          quotes: quotes,
          errors: {}
        }
        console.log(myObj.quotes)
        res.render('index', myObj)
      })
      .catch(/* ... */)
  })
  //
  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
    console.log(req.body)
  })
  //
  app.put('/quotes', (req, res) => {
    quotesCollection.findOneAndUpdate(
      { name: 'poop' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
      .then(result => {
        res.json('Success')
      })
      .catch(error => console.error(error))
  })
  //
  app.delete('/quotes', (req, res) => {
    quotesCollection.deleteOne(
      { name: req.body.name }
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No Query Match')
        }
        res.json('Deleted Darth Vadar\'s quote')
      })
      .catch(error => console.error(error))
  })
  // Server!
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

module.exports = { app, quotesCollection }
