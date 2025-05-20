const Blog = require('../models/blog.model')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    }
    next()
}

const userIdExtractor = async (req, res, next) => {
    const blogId = req.params.id
    
    const blog = await Blog.findById(blogId)
    if (blog === null) {
        res.status(404).json({ error: 'Blog does not exist' })
        next()
        return
    }
    req.userId = blog.user.toString()
    req.blogId = blogId
    
    next()
}

module.exports = { tokenExtractor, userIdExtractor }