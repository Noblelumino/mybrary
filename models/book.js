const mongoose = require('mongoose')
const author = require('./author')
const path = require ('path')

const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String
    },
    publishDate: {
        type:Date,
        required: true  
    },
    createdAt :{
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true 
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }
    
})
// helps display virtual properties like image 
bookSchema.virtual('coverImagePath').get(function(){
    if (this.coverImageName != null)
        return path.join('/', coverImageBasePath, this.coverImageName)
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath