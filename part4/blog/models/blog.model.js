const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    url: String,
    likes : Number,
    author: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.blogId = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.user.blogs
    }
})

module.exports = mongoose.model('Blog', blogSchema)

