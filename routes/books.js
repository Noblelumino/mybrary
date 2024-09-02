const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const fs = require('fs')
const path = require('path') // when we require an image to be store in a folder via a path 
const Author = require('../models/author')
const uploadPath = path.join('public',Book.coverImageBasePath)
const multer = require('multer') // helps file uploaads 
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter:(req, file, callback) =>{
        callback(null,imageMimeTypes.includes(file.mimetype))
    }
})



// all book route 
router.get('/', async (req,res) => {
    let query = Book.find()
    // this code actually helps us filter our search using the search 
    if (req.query.title != null && req.query.title != '' ){
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    // this helps you filter the search parameter using the date 
    if (req.query.publisedBefore != null && req.query.publisedBefore != '' ){
        query = query.lte('publishDate', req.query.publisedBefore)
    }

    if (req.query.publisedAfter != null && req.query.publiseAfter  != '' ){
        query = query.gte('publishDate', req.query.publisedAfter)
    }
    try{
        const books = await query.exec()
        res.render('books/index',{
        books: books,
        searchOptions: req.query
    })
    }catch{
        res.redirect('/')
    }
      
})

// new book routes
router.get('/new', async (req, res) =>{
   renderNewPage (res,new Book ())
    
})

// create book routes
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null // Parameter that shows the file name 
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount:req.body.pageCount,
        coverImageName: fileName, // if a file is uploaded then it enetrs here 
        description:req.body.description,
    })
    try{
        const newBook = await book.save() 
        //res.redirect('books/${newBook.id})
        res.redirect('books')
    }catch{
        if (book.coverImageName != null){
            removeBookCover(book.coverImageName)
        }
        removeBookCover(book.coverImageName)
        renderNewPage(res, book, true)
    }
  });


function removeBookCover(fileName){
    fs.unlink(path.join(uploadPath , fileName), err => {
        if (err) console.error(err)
    })
}



// this function helps in saving fields created
   async function renderNewPage(res , book, hasError = false){
    try{
        const authors = await Author.find({})
        const params = {
            authors:authors,
            book:book
        }
        if (hasError) params.errorMessage ='Error creating book'
        res.render('books/new', params)   
    }catch{
        res.redirect('/books')
    }
    
  }
  

module.exports = router;