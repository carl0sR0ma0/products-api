const {Schema, model} = require('mongoose')

const CategorySchema = new Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  products:[{
    type: Schema.Types.ObjectId,
    ref: 'productSchema'
  }]
},
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('categorySchema', CategorySchema)