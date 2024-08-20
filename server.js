// check if we are running env 
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}



const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const ejs = require('ejs')

const indexRouter = require('./routes/index')// from the routes folder

//set view engine 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')//avoid duplicating heders and footers 
app.use(expressLayouts)
// tell express where our public file is gonna be 
app.use(express.static('public'))


const mongoose = require('mongoose')// require database 
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose')
)

app.use('/', indexRouter)



// when deployed the app is gonna tell us what port is listening to 
app.listen(process.env.PORT || 3000)
