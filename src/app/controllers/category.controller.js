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
}

module.exports = new Category()