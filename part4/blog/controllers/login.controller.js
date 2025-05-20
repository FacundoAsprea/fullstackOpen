const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const dotenvConfig = require('../utils/config')

const login = async (req, res) => {
    const { username, password } = req.body

    const userAccount = await User.find({ username: username })
    // console.log(userAccount)

    if (!userAccount) {
        res.status(401).json({ error: 'Account not found'})
        return
    }

    const isPasswordCorrect = await bcrypt.compare(password, userAccount[0].password)
    
    if (!isPasswordCorrect) {
        res.status(401).json({ error: 'Incorrect password' })
        return
    }

    const userToGenToken = {
        username: username,
        id: userAccount[0]._id.toString()
    }

    const token = jwt.sign(userToGenToken, dotenvConfig.SECRET)
    console.log(token)
    // console.log({ token, username: username, name: userAccount.name })

    // const test = jwt.verify(token, dotenvConfig.SECRET)
    // console.log(test)

    res.status(200).send({ token, username: username, name: userAccount[0].name })
}

loginRouter.post('/', login)

module.exports = loginRouter