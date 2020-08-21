const express = require('express')
const route = express.Router()
const Product = require('./../controllers/products.controller')

route.post('/criar', Product.createProduct)
route.get('/visualizarTodos', Product.viewProducts)
route.get('/visualizarUm/:nome', Product.viewOneProduct)
route.put('/atualizarUm/:nome', Product.updateOneProduct)

module.exports = route