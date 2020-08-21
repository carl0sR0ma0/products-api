const express = require('express')
const route = express.Router()
const Product = require('./../controllers/products.controller')

route.post('/criar', Product.createProduct)
route.get('/visualizarTodos', Product.viewProducts)

module.exports = route