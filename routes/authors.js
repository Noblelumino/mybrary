const express = require('express')
const router = express.Router()
const Author = require('../models/author')


// all authors route 
router.get('/', async (req,res) => {
    let searchOptions = {} // searchOption is the variable for search equal to an empty string 
    if (req.query.name != null && req.query.body !==''){
         //if wat comes in is not null and empty
         searchOptions.name = new RegExp(req.query.name, 'i')
    } 
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')

    }
})

// new author routes
router.get('/new',(req, res) =>{
    res.render('authors/new', {Author:new Author() }) // this is only existent cos it was imported from the models(database) folder
})

// create new author routes
router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    });
  
    try {
      const newAuthor = await author.save(); // Await the save operation
      //res.redirect(`/authors/${newAuthor.id}`); // Redirect to the new author's page
      res.redirect('/authors');
    } catch (err) {
      res.render('authors/new', {
        author: author, // Reference the `author` variable here
        errorMessage: 'Error creating author'
      });
    }
  });
  

module.exports = router;