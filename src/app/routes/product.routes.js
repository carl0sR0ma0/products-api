const express = require('express')
const route = express.Router()
const Product = require('../controllers/product.controller')

route.get('/listarTodos', Product.searchAllProducts)
route.get('/listarUm/:nomeProduto', Product.searchOneProductByName)
route.post('/criar', Product.createOneProduct)

module.exports = route