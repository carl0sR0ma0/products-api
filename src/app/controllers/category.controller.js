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
          }
          if (data['products'].length <= 0 || data == null) {
            res.status(200).send({ message: `A categoria ${nomeCategoria} não possui nenhum produto cadastrado` })
          } else {
            res.status(200).send({ message: `A categoria ${nomeCategoria} possui os seguintes produtos`, data: data })
          }
        }
    })
  }
}

module.exports = new Category()