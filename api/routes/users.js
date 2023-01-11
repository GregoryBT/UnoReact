const express = require('express')
const router = express.Router()

// Require controller modules.
const usersControllers = require('../controllers/usersControllers.js')

// GET
router.get('/', usersControllers.get)
// POST
router.post('/', usersControllers.post)
router.post('/login', usersControllers.login)
router.post('/veriflogin', usersControllers.veriflogin)


module.exports = router