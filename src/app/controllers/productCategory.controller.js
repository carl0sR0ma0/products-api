const productSchema = require('./../model/products.model')
const categorySchema = require('./../model/categories.model')

class productCategory {
  async newProductCategory(req, res) {
    const { categoryId } = req.params

    const newProduct = new productSchema(req.body)

    const category = await categorySchema.findById(categoryId)

    newProduct.category = category

    await newProduct.save()

    category.products.push(newProduct)

    await category.save()
    res.status(200).send({message: `Foi criado com sucesso o produto ${newProduct.name} com a categoria ${category.name}`}).json(newProduct)
  }

  async getProductCategory(req, res) {
    const { categoryId } = req.params
    const category = await categorySchema.findById(categoryId).populate('products')
  
    res.status(200).json(category)
  }
}

module.exports = new productCategory()