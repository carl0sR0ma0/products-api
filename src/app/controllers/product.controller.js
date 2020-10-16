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
            res.status(200).send({message: 'Não existem products cadastrados na base de dados' })
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

  updateProduct(req, res) {
    const { productId } = req.params
    const reqBody = req.body
    const categoryId = reqBody['category']

    product.updateOne({ _id: productId }, { $set: reqBody }, (err, product) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
      } else {
        category.findOne({ products: productId }, (err, result) => {
          if (err) {
            res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
          } else {
            if (result['_id'] == categoryId) {
              res.status(200).send({ message: "O Produto foi atualizado", data: product })
            } else {
              result.products.pull(productId)
              result.save({}, (err) => {
                if (err) {
                  res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
                } else {
                  category.findById(categoryId, (err, categoria) => {
                    if (err) {
                      res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
                    } else {
                      categoria.products.push(productId)
                      categoria.save({}, (err) => {
                        if (err) {
                          res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição" })
                        } else {
                          res.status(200).send({ message: "O Produto foi atualizado", data: product })
                        }
                      })
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  }

  deleteProduct(req, res) {
    const { productId } = req.params

    category.findOne({ products: productId }, (err, categoria) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
      } else {
        categoria.products.pull(productId)
        categoria.save({}, (err) => {
          if (err) {
            res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
          } else {
            product.deleteOne({ _id: productId }, (err, result) => {
              if (err) {
                res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
              } else {
                res.status(200).send({message: "O Produto foi apagado com sucesso", data: result })
              }
            })
          }
        })
      }
    })
  }
}

module.exports = new Product()