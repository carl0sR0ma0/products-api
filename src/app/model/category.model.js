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
  description: {
    type: String,
    trim: true
  },
  products:[{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
},
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Category', CategorySchema)