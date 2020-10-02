const product = require('../model/product.model')
const category = require('../model/category.model')

class Product {

  searchAllProducts(req, res) {    

    product.find({})
    .populate('category', { name: 1 })
    .sort({ name: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({message: 'Não existem filmes cadastrados na base de dados' })
          } else {
            res.status(200).send({message: 'Todos os produtos foram recuperados com sucesso', data: data })
          }
        }
      })
  }

  searchOneProductByName(req, res) {
    const { nomeProduto } = req.params

    if (nomeProduto == undefined || nomeProduto == 'null') {
      res.status(400).send({message: "O nome do produto deve ser obrigatóriamente preenchido" })
    }

    product.findOne({name: nomeProduto})
      .populate('category', { name: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
        } else {
          if (data == null) {
            res.status(200).send({message: `Produto não encontrado no banco de dados` })
          }
          res.status(200).send({message: `Produto ${nomeProduto} foi recuperado com sucesso`, data: data })
        }
    })
  }

  createOneProduct(req, res) {
    const reqBody = req.body
    const idCategoria = reqBody['category']

    product.create(reqBody, (err, product) => {
      if (err) {
        res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
      } else {
        category.findById(idCategoria, (err, category) => {
          if (err) {
            res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
          } else {
            category.products.push(product)
            category.save({}, (err) => {
              if (err) {
                res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
              } else {
                res.status(201).send({ message: "Produto criado com sucesso", data: product })
              }
            })
          }
        })
      }
    })
  }

  validateProductName(req, res) {
    const name = req.query.name.replace(/%20/g, " ")

    product.find({name: {'$regex': `^${name}$`, '$options': 'i' } }, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Houve um erro ao processar a sua requisição"})
      } else {
        if (result.length > 0) {
          res.status(200).send({ message: "Já existe um produto cadastrado com esse nome", data: result.length })
        } else {
          res.status(200).send({ message: "Produto disponível", data: result.length })
        }
      }
    })
  }
}

module.exports = new Product()