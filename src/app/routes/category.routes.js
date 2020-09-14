const express = require('express')
const route = express.Router()
const Category = require('../controllers/category.controller')

route.get('/listarTodos', Category.searchAllCategories)
route.get('/listarUm/:nomeCategoria', Category.searchForProductsInACategoryByTheirName)
route.post('/criar', Category.createOneCategory)
// route.post('/criar', Category.createCategory)
// route.get('/visualizarUm/:nome', Category.viewOneCategory)
// route.put('/atualizarUm/:nome', Category.updateOneCategory)
// route.delete('/apagarUm/:nome', Category.deleteOneCategory)

module.exports = route