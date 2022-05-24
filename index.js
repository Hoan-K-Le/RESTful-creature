const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const fs = require('fs')
const { disconnect } = require('process')
const app = express()
const PORT = 3000

// tell express that I am using ejs as the view engine
app.set('view engine', 'ejs')

// tell my app that im using ejs layouts
app.use(ejsLayouts)

//body parser middleware
app.use(express.urlencoded({extended: false}))
// allow non GET/POST methods fro, an HTML 5 form
app.use(methodOverride('_method'))

app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))
// HOME ROUTE
app.get('/', (req,res) => {
    res.render('home.ejs')
})















// app listen to port
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})