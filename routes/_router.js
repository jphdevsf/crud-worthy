
// const myRoutes = (app) => {
//   app.get('/', (req, res) => {
//     const myObj = {
//       title: 'Crud Worthy',
//       data: {},
//       errors: {}
//     }
//     res.render('index', myObj)
//   })

//   app.post('/quotes', (req, res) => {
//     quotesCollection.insertOne(req.body)
//     console.log(req.body)
//   })

//   app.use((req, res) => {
//     res.status(400)
//     res.render('404.pug', { title: '404: File Not Found' })
//   })

//   app.use((error, req, res, next) => {
//     res.status(500)
//     res.render('500.pug', { title: '500: Internal Server Error', error: error })
//   })
// }

// module.exports = myRoutes
