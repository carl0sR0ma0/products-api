const express = require('express')
const route = express.Router()
const Product = require('./../controllers/products.controller')

route.post('/criar', Product.createProduct)

module.exports = route