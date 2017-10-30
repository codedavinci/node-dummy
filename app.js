const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()



hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))


app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method}  ${req.url}`
  console.log(log)

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.')
    }
  })
  next()

})


app.use((req, res) => {
  res.render('maintenance.hbs')
})

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() )
hbs.registerHelper('screamIt', (text) => text.toUpperCase()  )


app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcomeMessage: "Welcome beautiful peeps :D"
  })
})
 
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  })
})

app.listen(8080,  () => {
  console.log("Listening on port:", 8080)
})