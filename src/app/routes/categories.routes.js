const express = require('express')
const route = express.Router()
const Category = require('./../controllers/categories.controller')

route.post('/criar', Category.createCategory)
route.get('/visualizarTodos', Category.viewCategories)
route.get('/visualizarUm/:nome', Category.viewOneCategory)

module.exports = route