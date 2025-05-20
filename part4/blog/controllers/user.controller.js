const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const logger = require('../utils/logger')
const userController = require('express').Router()

const getAllUsers = async (req, res) => {
    const userList = await User.find({}).populate('blogs')
    res.send(userList)
}

const createNewUser = async (req, res) => {
    const { username, password, name } = req.body

    const usernameIsRepeated = await User.find({username: username})

    if(username.length < 3) {
        res.status(400).send({ error:'Username must have atleast 3 characters' })
        return
    }
    if(usernameIsRepeated[0]) {
        res.status(400).send({ error: 'Username already in use' })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ username, password: hashedPassword, name })

    const savedUser = await newUser.save()
    res.status(201).end()
}

userController.get('/', getAllUsers)
userController.post('/', createNewUser)

module.exports = userController
