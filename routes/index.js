const express = require('express')
const router = express.Router()
const Book = require('../models/book')


// all authors route 
router.get('/', async (req,res) => {
    let books
    try{
        books = await Book.find().sort({ createAt : 'desc'}).limit(10).exec()
    }catch{
        books = []
    }
    res.render('index',{books: books})
})


module.exports = router// makes it possible for the resources here to be seen by the server     