import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('shopping-app')
const products = database.collection('products')
client.connect()
console.log('connected to mongo')
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => console.log('API running on port 4040'))

app.get('/', async (request, response) => {
  const allProducts = await products.find().toArray()
  response.send(allProducts)
})

app.post('/', async (request, response) => {
  //const newProduct = { name: 'Miso', description: 'Miso paste', price: 7.99, exp: 2033}
  
  await products.insertOne(request.body)
  response.send('Item was added.')
})

app.delete('/', async (request, response) => {
  await products.findOneAndDelete(request.query)
})

app.put('/', async (request, response) => {
  await products.findOneAndUpdate(request.query, {$set: request.body})
  response.json('item was updated with special field')
})