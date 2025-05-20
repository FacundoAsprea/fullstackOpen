const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A username must be included']
    },
    password: {
        type: String,
        required: [true, 'A password must be included']
    },
    name: String,
    blogs: [  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    } ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.password
        delete returnedObject.__v
        delete returnedObject._id

        if (returnedObject.blogs[0]) {
            returnedObject.blogs.forEach(blog => {
                delete blog.user
                delete blog.likes
            })
        }
    }
})

module.exports = mongoose.model('User', userSchema)