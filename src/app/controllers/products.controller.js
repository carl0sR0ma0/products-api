const productSchema = require('./../model/products.model')

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
        res.status(200).send({message: 'Todos os filmes foram recuperados com sucesso', products: data })
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
}

module.exports = new Product()