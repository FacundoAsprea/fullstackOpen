const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const Users = require('../models/user.model')
const bcrypt = require('bcryptjs')
const logger = require('../utils/logger')

const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')

const api = supertest(app)

describe('USERS API TESTING: ', () => {
    describe('When a user is invalid: ', () => {

        beforeEach(async () => {
            await Users.deleteMany({})
        })

        test('Repeated username: ', async () => {
            const password = await bcrypt.hash('hola', 10)

            await api.post('/api/users')
                .send({ 
                    username: 'facu',
                    password: password,
                    name: 'facu'
                })
                .expect(201)

            await api.post('/api/users')
                .send({
                    username: 'facu',
                    password: password,
                    name: 'facu again'
                })
                .expect(400)
                .expect(res => {
                    logger.error(res.error.text)
                })
        })

        test('Username with less than 3 characters: ', async () => {
            const password = await bcrypt.hash('hola', 10)

            await api.post('/api/users')
                .send({ 
                    username: 'a',
                    password: password,
                    name: 'facu'
                })
                .expect(400)
                .expect(res => {
                    logger.error(res.error.text)
                })
        })
        
        test('Missing username and password: ', async () => {
            await api.post('/')
                .send({
                    name: 'papu'
                })
                .expect(404)
        })
    }) 

    after(async () => {
        await mongoose.connection.close()
        console.log('Connection closed.', 'Tests ended')
    })
})