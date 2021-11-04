const nodemon = require('nodemon')
const express = require('express') 
const path = require('path')
const hbs = require('hbs')
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const port = process.env.PORT || 5000;
const { brotliDecompressSync } = require('zlib');
const { STATUS_CODES } = require('http');
let address = 'madrid'
// Define path for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// Setup handlbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.disable('x-powered-by')
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

console.log(publicDirectoryPath);
console.log(viewsPath);
app.get('', (req, res) => {

 res.render('index', {

    title: "Weather",
    name: "Created by hassan amgharid"
 })

})
app.get('/weather', (req, res) => {

  if(!req.query.address) {

   return res.send({

        error: 'You must provide address in search'
    })
  }

geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

    if(error) {

        return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {

        if(error) {

            return res.send(error)
        }

        res.send({

            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
  })
})

app.get('/about', (req,res)=> {

res.render('about', {

    title: "About me",
    name: "Hassan Amgharid"
})

})
app.get('/about/*', (req,res)=> {

    res.render('404', {

        errorTitle: "Error 404",
        errorMessage: "about article not found",
        name: "Hassan"
      })
     
 })
app.get('*', (req,res) => {

    res.render('404', {

      errorTitle: "Error 404",
      errorMessage: "the page you are looking for does not exist",
      name: "Hassan"
    })
})
// app.get('/help', (req, res)=>{

//     res.send('help page')
// })
app.listen(port, ()=>{

    console.log('Running on port ' + port) 
})
