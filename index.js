const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const database = require('./src/config/database')

const ProductRoutes = require('./src/app/routes/product.routes')
const CategoryRoutes = require('./src/app/routes/category.routes')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({ type: 'application/json' }))

app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  res.send({message: `API ouvindo na porta ${PORT}` })

})

app.use('/produto', ProductRoutes)
app.use('/categoria', CategoryRoutes)

app.get('*', (req, res) => {
  res.send({message: 'API não encontrada!'})
})

app.listen(PORT, () => console.log(`API ouvindo na porta ${PORT}`))