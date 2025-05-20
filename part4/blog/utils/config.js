require('dotenv').config()
// require('dotenv').config({ path: process.env.NODE_ENV === 'test' 
//     ? './../.env'
//     : './.env'
// })

const MONGO_URL = process.env.MONGO_URL 
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET

module.exports = { MONGO_URL, PORT, SECRET }