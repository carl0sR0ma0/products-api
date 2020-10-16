const express = require('express')
const route = express.Router()
const Category = require('../controllers/category.controller')

route.get('/listarTodos', Category.searchAllCategories)
route.get('/listarUm/:nomeCategoria', Category.searchForProductsInACategoryByTheirName)
route.post('/criar', Category.createOneCategory)
route.get('/validarNomeCategoria', Category.validateCategoryName)
route.put('/atualizar/:categoryId', Category.updateCategory)
route.delete('/apagar/:categoryId', Category.deleteCategory)

module.exports = route