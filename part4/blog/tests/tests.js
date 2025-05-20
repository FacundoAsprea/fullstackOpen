const tests = require('./../utils/list_helpers')
const mongoose = require('mongoose')

const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const Blog = require('../models/blog.model')
const testingBlogs = require('./../utils/testingBlogs')

const supertest = require('supertest')
const app = require('../app')

const { isKeyObject } = require('node:util/types')
const { createNewBlog } = require('../controllers/blog.controller')
const { before } = require('lodash')

const api = supertest(app)

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('Basic tests: ', () => {

  test('dummy returns one', () => {
    const blogs = []
  
    const result = tests.dummy(blogs)
    assert.strictEqual(result, 1)
  })

  test('Total likes', () => {
    const result = tests.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

  test('Return blog with most Likes: ', () => {
    const result = tests.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })

  test('Getting author with most blogs ', () => {
    const result = tests.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('Getting author with most likes ', () => {
    const result = tests.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

})

describe('API TESTING: ', () => {

  beforeEach(async () => {
      await Blog.deleteMany({})

      for (let blogs of testingBlogs) {
        let newBlog = new Blog(blogs)
        await newBlog.save()
      }
  })

  test('Getting all the Blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, testingBlogs.length)
  })

  test('Correct formatting of ID', async () => {
    const response = await api.get('/api/blogs')
    keys = Object.keys(response.body[0])
    isId = keys.some(key => key === 'id')
    assert.strictEqual(isId, true)
  })

  test('Post of a Blog', async () => {
    const blog = { 'title': '123 probando', 'author': 'yo', 'url': 'www.e.zzz', 'likes': 1 }
    const response = await api.post('/api/blogs')
      .send(blog)
      .expect(204)
      .expect(res => assert.deepStrictEqual(res.request._data, blog))
  })  

  describe('Posting with missing inputs: ', () => {

  test('When likes is not defined, it should include it with a value of 0', async () => {
    const blog = { 'title': '123 probando', 'author': 'yo', 'url': 'www.e.zzz' }
    const response = await api.post('/api/blogs')
      .send(blog)
      .expect(204)
      .expect(res => {
        assert.deepStrictEqual({ ...res.request._data, likes: 0 }, { ...blog, likes: 0 })
    })
  })  

  test('Without title: ', async () => {
    const blog = { 'author': 'lol'}
    const response = await api.post('/api/blogs')
      .send(blog)
      .expect(400)
  })

  describe('Deleting blogs: ', () => {
    
  test('Delete with a valid id: ', async () => {
    const validBlogId = await (await api.get('/api/blogs')).body[0].id
        
    const response = await api.delete(`/api/blogs/${validBlogId}`)
      .expect(200)
  })

  test('Delete with an invalid id: ', async () => {
    const response = await api.delete('/api/blogs/invalid')
      .expect(404)
    })  
  })

   describe('Updating a Blog: ', () => {
    
    test('Updating a valid Blog: ', async () => {
      const validBlog = await api.get('/api/blogs')
      const modifiedBlog = { ...validBlog._body[0], title: 'facu' }

      const response = await api.put(`/api/blogs/${validBlog._body[0].id}`)
        .send(modifiedBlog)
        .expect(200)
      
      const test = await api.get('/api/blogs')
        .expect(200)
      assert.deepStrictEqual(modifiedBlog, test._body[0])
      })
    })
  })

   after(async () => {
    await mongoose.connection.close()
  })

})