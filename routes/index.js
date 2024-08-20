const express = require('express')
const router = express.Router()


// all authors route 
router.get('/',(req,res) => {
    res.render('index')
})


module.exports = router// makes it possible for the resources here to be seen by the server 