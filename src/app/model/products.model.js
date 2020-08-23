const {Schema, model} = require('mongoose')
const mongoose = require('../../config/database')

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
  qty: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  enabled: {
    type: Boolean,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categoriesSchema',
  }
},
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('productSchema', ProductSchema)