const category = require('../model/category.model')
const product = require('./../model/product.model')

class Category {
  
  searchAllCategories(req, res) {
    category.find({})
      .sort({ name: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
        } else {
          if (data.length <= 0) {
            res.status(200).send({ message: "Não foram encontrados categorias para exibir" })
          } else {
            res.status(200).send({ message: "Categorias recuperadas com sucesso", data: data })
          }
        }
      })
  }

  searchForProductsInACategoryByTheirName(req, res) {
    const {nomeCategoria} = req.params

    if (nomeCategoria == undefined || nomeCategoria == 'null') {
      res.status(400).send({ message: "O nome da categoria deve ser obrigatóriamente preenchido" })
    }

    category.findOne({ name: nomeCategoria })
      .populate('products', { name: 1, image: 1, price: 1, freeShipping: 1, enabled: 1, brand: 1, model: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
        } else {
          if (data == null) {
            res.status(200).send({ message: `A categoria ${nomeCategoria} não existe no banco de dados` })
          } else {
            res.status(200).send({ message: `A categoria ${nomeCategoria} possui os seguintes produtos`, data: data })
          }
        }
    })
  }

  createOneCategory(req, res) {
    const reqBody = req.body

    category.create(reqBody, (err, data) => {
      if (err) {
        res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
      } else {
        res.status(200).send({ message: "Categoria criado com sucesso", data: data })
      }
    })
  }

  validateCategoryName(req, res) {
    const name = req.query.name.replace(/%20/g, " ")

    category.find({name: { '$regex': `^${name}$`, '$options': 'i' } }, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Houve um erro ao processar a sua requisição"})
      } else {
        if (result.length > 0) {
          res.status(200).send({ message: "Já existe uma categoria cadastrado com esse nome", data: result.length })
        } else {
          res.status(200).send({ message: "Categoria disponível", data: result.length })
        }
      }
    })
  }

  updateCategory(req, res) {
    const { categoryId } = req.params
    const reqBody = req.body

    category.updateOne({ _id: categoryId }, { $set: reqBody }, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Houve um erro ao processar a sua requisição"})
      } else {
        if (result.n > 0) {
          category.findOne({ _id: categoryId }, (err, categoria) => {
            if (err) {
              res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
            } else {
              res.status(200).send({ message: "A Categoria foi atualizada", data: categoria })
            }
          })
        }
      }
    })
  }

  deleteCategory(req, res) {
    const { categoryId } = req.params

    category.findOne({ _id: categoryId }, (err, categoria) => {
      if (err) {
        res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
      } else {
        product.deleteMany({ category: categoryId }, (err) => {
          if (err) {
            res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
          } else {
            category.deleteOne({ _id: categoryId }, (err, result) => {
              if (err) {
                res.status(500).send({message: "Houve um erro ao processo ao processar sua requisição", error: err })
              } else {
                res.status(200).send({message: "A categoria foi apagada com sucesso", data: result })
              }
            })
          }
        })
      }
    })
  }
}

module.exports = new Category()