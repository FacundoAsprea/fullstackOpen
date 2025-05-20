const express = require('express')
const app = express()

const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blog.controller')
const usersRouter = require('./controllers/user.controller')
const loginRouter = require('./controllers/login.controller')

const middlewares = require('./middlewares/middlewares')

app.use(cors())
app.use(express.json())
app.use(middlewares.tokenExtractor)

mongoose.connect(config.MONGO_URL)
.then(() => logger.info('Connected successfully to MongoDB'))
.catch((err) => logger.error("An error has ocurred while trying to connect to MongoDB: ", err))


const Blog = require('./models/blog.model')

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app 
