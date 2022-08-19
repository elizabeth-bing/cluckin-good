const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

//import chick routes
const routes = require('./routes')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const chicksData = JSON.parse(data)
      res.render('home', chicksData)
    }
  })
})

//PREFIX: set up to use chick routes, directs comp to look into chick routes to see if either of those are used
server.use('/chicks', routes)

module.exports = server
