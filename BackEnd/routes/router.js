const express = require('express')
const router = express.Router()
const { signup, login, home ,verifyJWT} = require('../controller/user')

router.post('/signup', signup)
router.post('/login', login);
router.get('/home',verifyJWT,home)

module.exports = router;