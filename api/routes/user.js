const express = require('express')
const router = express.Router()

// Require controller modules.
const userControllers = require('../controllers/userControllers.js')

// GET
router.get('/', userControllers.get)

module.exports = router