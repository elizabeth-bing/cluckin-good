//export routes and attach to router
const express = require('express')
const router = express.Router()
const fs = require('fs')

//GET map route (MVP version) // **ideal version is to  have this as a render rather than hard code
router.get('/map', (req, res) => {
  res.sendFile(__dirname + '/public/map.html')
})

//GET redirect route to compliments
router.get('/compliments', (req, res) => {
  // res.send('<h1> You are a good chick!!</h1>')
  let chickObject = { name: req.query.name } //**ideal - add to hbs file {{compliment}} and then the compliment is picked based on a randomiser i.e. compliment = math.random */
  console.log(chickObject)
  res.render('compliments', chickObject)
})

// function to read file / update edit page

function readChickData(cb) {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      Error('Aww shucks. An error.')
    } else {
      const chickData = JSON.parse(data)
      cb(chickData)
    }
  })
}
router.get('/:id', (req, res) => {
  const id = req.params.id
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const chicksData = JSON.parse(data)
      const selectedChick = chicksData.chicks.find((item) => item.id == id)
      res.render('details', selectedChick)
    }
  })
})

//GET edit chicks
router.get('/:id/edit', (req, res) => {
  readChickData(
    /*this is the callback*/ (chickData) => {
      const selectedChick = chickData.chicks.find(
        (chick) => chick.id == req.params.id
      )
      res.render('edit', selectedChick)
    }
  )
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const chicksData = JSON.parse(data)
      const selectedChick = chicksData.chicks.find((item) => item.id == id)
      res.render('details', selectedChick)
    }
  })
})

router.post('/:id/edit', (req, res) => {
  readChickData((chickData) => {
    const chick = chickData.chicks.find((chick) => chick.id == req.params.id)
    console.log(req.body)
    chick.name = req.body.name
    chick.location = req.body.location
    chick.status = req.body.status

    fs.writeFile('./data.json', JSON.stringify(chickData, null, 2), (err) => {
      if (err) {
        Error("Uh oh! There's something wrong")
      } else {
        res.redirect('/chicks/compliments?name=' + chick.name)
        // res.redirect(`/chicks/compliments`) // update to say a compliment with a link back to home page
      }
    })
  })
})

module.exports = router

// we want to create a button on the homepage that takes you to '/:id/edit' but the id number is randomised using math.random.

// Steps:
// create a button on the home page
// create a get and post request (line 25 and 38)
// use math.random to generate the id number.
