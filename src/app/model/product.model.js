const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
  sku: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: false
  },
  qty: {
    type: Number,
    required: false
  },
  freeShipping: {
    type: Boolean,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true
  },
  brand: {
    type: String,
    trim: true,
    required: false
  },
  model: {
    type: String,
    required: false,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim:true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Product', ProductSchema)