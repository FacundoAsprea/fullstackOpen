const _ = require('lodash')


const dummy = blogs => 1

const totalLikes = (blogs) => {
    const likes = blogs.reduce((acc, blog) => {
        return acc += parseInt(blog.likes)
    }, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = blogs[0]
    blogs.forEach((blog, index) => favoriteBlog = blog.likes > favoriteBlog.likes ? blog : favoriteBlog)
    return favoriteBlog
}

const mostBlogs = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    const authorsKeys = Object.keys(authors)
    let authorWithMostBlogs = 0

    authorsKeys.forEach(key => {
        const actualAuthor = authors[key]
        const totalBlogs = actualAuthor.length

        authorWithMostBlogs = authorWithMostBlogs.length > totalBlogs ? authorWithMostBlogs : { author: actualAuthor[0].author, blogs: actualAuthor.length }
    })
    return authorWithMostBlogs
}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    const authorsKeys = Object.keys(authors)
    let authorWithMostLikes = 0

    authorsKeys.forEach(key => {
        const actualAuthor = authors[key]

        const likes = actualAuthor.reduce((acc, blog) => {
            return acc += blog.likes
        }, 0)

        authorWithMostLikes = authorWithMostLikes.likes > likes ? authorWithMostLikes : { author: actualAuthor[0].author, likes: likes }
    })
    return authorWithMostLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }