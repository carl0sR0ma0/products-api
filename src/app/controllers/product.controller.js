const productSchema = require('../model/product.model')

function defineSearchFields(fields) {
  if (fields == 'price') {
    return {name: 1, price: 1}
  } else if (fields == 'name') {
    return {name: 1}
  } else {
    return null
  }
}

class Product {
  
  createProduct(req, res) {
    const body = req.body

    productSchema.create(body, (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
      } else {
        res.status(201).send({message: 'Produto criado com sucesso no banco de dados', product: data })
      }
    })
  }

  viewProducts(req, res) {
    const fields = req.query.campos

    productSchema.find({}, defineSearchFields(fields), (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
      } else {
        res.status(200).send({message: 'Todos os produtos foram recuperados com sucesso', products: data })
      }
    })
  }

  viewOneProduct(req, res) {
    const name = req.params.nome

    productSchema.find({name: name}, (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
      } else {
        res.status(200).send({message: `Produto ${name} foi recuperado com sucesso`, product: data })
      }
    })
  }

  updateOneProduct(req, res) {
    const productNameToBeUpdated = req.params.nome
    const newProductName = req.body.name

    productSchema.updateOne({name: productNameToBeUpdated }, {$set: req.body}, (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
      } else {
        if (data.n > 0) {
          productSchema.findOne({name: newProductName}, (err, result) => {
            if (err) {
              res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
            } else {
              res.status(200).send({message: `Produto ${productNameToBeUpdated} teve seu nome atualizado para ${newProductName}`, product: result })
            }
          })
        }
      }
    })
  }

  deleteOneProduct(req, res) {
    const productNameToBeDeleted = req.params.nome

    productSchema.deleteOne({name: productNameToBeDeleted}, (err) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao apagar um produto', error: err })
      } else {
        res.status(200).send({message: `O produto ${productNameToBeDeleted} foi apagado com sucesso!`})
      }
    })
  }
}

module.exports = new Product()