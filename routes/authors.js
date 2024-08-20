const express = require('express')
const router = express.Router


// all authors route 
router.get('/',(req,res) => {
    res.render('authors/index')
})

// new author routes
router.get('/new',(req, res) =>{
    res.render('authors/new')
})

// create new author routes
router.post('/',(req, res) =>{
    res.send ('create')
})

module.exports = router