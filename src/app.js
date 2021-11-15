const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  // We added /views later after creating new folder views in templates
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // handlebars lives in views folder
app.set('views', viewsPath) // removed views folder and added custom folder templates, so, need to set this property.
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raman Walia'
    })
})

app.get('/about/', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Raman Walia'
    })
})

app.get('/help/', (req, res) => {
    res.render('help', {
        helptext: 'Help content goes here!',
        title: 'Help',
        name: 'Raman Walia'
    })
})


//served from index.html so we do not need it
// app.get('', (req, res) => {
//     res.send('Hello Express!')
// })

// Served from public directory so dont require here
// app.get('/help', (req, res) => {
//     res.send('Hello Help page!')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    
    const address = req.query.address

    if(!address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    // = {} this reflects default function parameters
    geocode(address, (error, {latitude, longitude, location} = {}) => {
    
        if (error) {
            return res.send({error})
        }
        // Object property destruction usage 
        //forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
    
            res.send({
                Location: location,
                Forecast: forecastData.current,
                address: address
            })
            //console.log(location)
            //console.log(forecastData.current)
            //console.log('Error', error)
            //console.log('Data', forecastData)
        })
    })

    // res.send({
    //     forecast: 'Sunshine',
    //     Location: 'Mohali',
    //     address: address
    // })
})

// products?search=games&rating=4
app.get('/products', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Raman Walia',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
   // res.send('My 404 page')
   res.render('404', {
       title: '404',
       name: 'Raman Walia',
       errorMessage: 'Page not found.'
   })
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})