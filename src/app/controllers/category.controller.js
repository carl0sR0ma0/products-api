const category = require('../model/category.model')

class Category {
  
  searchAllCategories(req, res) {
    category.find({}, { products: 0 })
      .sort({ name: 1 })
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
        } else {
          if (data.length < 0) {
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

    category.find({ name: nomeCategoria })
      .populate('products', { name: 1, image: 1})
      .exec((err, data) => {
        if (err) {
          res.status(500).send({ message: "Houve um erro ao processar a sua requisição", error: err })
        } else {
          if (data.length <= 0) {
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
}

module.exports = new Category()