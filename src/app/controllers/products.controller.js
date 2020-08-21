const productSchema = require('./../model/products.model')

class Product {
  
  createProduct(req, res) {
    const body = req.body

    productSchema.create(body, (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err})
      } else {
        res.status(201).send({message: 'Produto criado com sucesso no banco de dados', product: data})
      }
    })
  }
}

module.exports = new Product()