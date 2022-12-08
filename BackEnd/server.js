const express = require('express')
const app = express()



const jwt = require('jsonwebtoken');
const privateKey = "tempKey";

const generateJWT = async (data) => {
    let token = await jwt.sign(data, privateKey, { expiresIn: 10 });
    return token;
}


const db = require('./dbConnection/index')
require('dotenv').config()
const router = require('./routes/router')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/app', router)

app.listen(process.env.port, () => console.log(`Server is running ${process.env.port}`))