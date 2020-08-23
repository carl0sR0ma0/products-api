const express = require('express')
const route = express.Router()
const ProductCategory = require('./../controllers/productCategory.controller')

route.post('/criar/:categoryId', ProductCategory.newProductCategory)
route.get('/visualizarTodos/:categoryId', ProductCategory.getProductCategory)

module.exports = route