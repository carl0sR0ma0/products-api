const product = require('../model/product.model')

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

    product.find({name: nomeProduto})
      .populate('category', { name: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({message: `Produto não encontrado no banco de dados` })
          }
          res.status(200).send({message: `Produto ${nomeProduto} foi recuperado com sucesso`, data: data })
        }
    })
  }

  createProduct(req, res) {
    const body = req.body

    product.create(body, (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
      } else {
        res.status(201).send({message: 'Produto criado com sucesso no banco de dados', product: data })
      }
    })
  }
}

module.exports = new Product()