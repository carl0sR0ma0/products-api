const categorySchema = require('./../model/categories.model')

class Category {
  createCategory(req, res) {
    const body = req.body

    categorySchema.create(body, (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
      } else {
        res.status(201).send({message: 'Categoria criada com sucesso no banco de dados', category: data })
      }
    })
  }

  viewCategories(req, res) {
    const fields = req.params.campos

    categorySchema.find({}, (err, data) => {
      if (err) {
        res.status(500).send({message: 'Houve um erro ao processar a sua requisição', error: err })
      } else {
        res.status(200).send({message: 'Todas as categorias foram recuperados com sucesso', categories: data })
      }
    })
  }
}

module.exports = new Category()