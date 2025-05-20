const express = require('express')
const Blog = require('../models/blog.model')
const logger = require('../utils/logger')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const dotenvConfig = require('../utils/config')

const middlewares = require('../middlewares/middlewares')

const blogsRouter = require('express').Router()


const getAllBlogs = async (req, res) => {
    const response = await Blog.find({}).populate('user')
    res.json(response)
}

const createNewBlog = async (req, res) => {
    let blog = req.body
    console.log(req.token)
    const decodedToken = jwt.verify(req.token, dotenvConfig.SECRET)

    if (!decodedToken.id) {
        res.status(401).json({ error: 'Invalid token' })
        return 
    }

    const blogUser = await User.findById(decodedToken.id)
    blog.user = blogUser._id

    if (!blog.likes) { blog = { ...blog, likes: 0 } }

    if (!blog.title || !blog.url) { 
        res.status(400).end()
        return 
    }

    const newBlog = new Blog(blog)
    blogUser.blogs.push(newBlog._id)

    await User.findByIdAndUpdate(blogUser._id, blogUser)

    const response = await newBlog.save()

    if (response !== newBlog) { logger.error("Failed to create a new blog: ", err); return }

    res.status(204).end() 
}

const deleteBlog = async (req, res) => {
    const userToken = jwt.verify(req.token, dotenvConfig.SECRET)
    const blogId = req.blogId

    if (userToken.id === req.userId) {
        await Blog.findByIdAndDelete(blogId)
        res.status(200).end()
        return
    }

    res.status(401).send({ error: 'Invalid token' })
}

const updateBlog = async (req, res) => {
    const blogId = req.params.id
    const updatedBlog = req.body

    try {
        await Blog.findByIdAndUpdate(blogId, updatedBlog)
        res.status(200).end()
    } catch(err) {
        res.status(404).send(err)
    }
}

blogsRouter.get('/', getAllBlogs)
blogsRouter.post('/', createNewBlog)
blogsRouter.delete('/:id', middlewares.userIdExtractor, deleteBlog)
blogsRouter.put('/:id', updateBlog)

module.exports = blogsRouter 